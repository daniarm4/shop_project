from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

import stripe

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction

from .permissions import IsOwner
from products.models import Product
from .serializers import OrderSerializer
from .models import Order, OrderItems


class OrderListCreateAPIView(ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

    def create(self, request, *args, **kwargs):
        address = request.data.get('address')
        if not address:
            return Response({"address": "This field is required"}, status=400)
        
        customer = request.user
        with transaction.atomic():
            order = Order.objects.create(
                customer=customer,
                status='not_paid',
                address=address
            )
            product_slugs = [product_slug for product_slug, _ in request.data.get('products')] # data = {'products': [[product_slug, quantity], ...]}
            products = Product.objects.filter(slug__in=product_slugs)
            order_items = []
            for product_slug, quantity in request.data.get('products'):
                product = products.get(slug=product_slug)
                order_items.append(OrderItems(
                    order=order,
                    product=product,
                    price=product.price,
                    quantity=quantity
                )) 

            OrderItems.objects.bulk_create(order_items)

            serializer = OrderSerializer(order)
            return Response(serializer.data)
    

class OrderRetrieveAPIView(RetrieveAPIView):
    serializer_class = OrderSerializer
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)


class StripeCheckoutView(APIView):
    def post(self, request):
        stripe.api_key = settings.STRIPE_SECRET_KEY
    
        order = get_object_or_404(
            Order,
            id=request.data.get('order_id')
        )
        order_items = OrderItems.objects.filter(
            order=order
        )

        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': order_item.product.name,
                                'description': order_item.product.description,
                            },
                            'unit_amount': round(order_item.price),
                        },
                    'quantity': order_item.quantity
                    }
                for order_item in order_items],
                mode='payment',
                success_url=settings.FRONTEND_HOST + 'checkout/success',
                cancel_url=settings.FRONTEND_HOST + 'checkout/cancel',
                customer_email=str(request.user.email),
                metadata={
                    "order_id": str(order.id),
                }
            )
            return Response({'session_url': session.url}, status=302)

        except Exception as e:
            return Response({'error': str(e)}, status=400)


class StripeWebhook(APIView):
    permission_classes = (AllowAny, )

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        webhook_secret = settings.STRIPE_WEBHOOK_SECRET

        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError as e:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            return HttpResponse(status=400)

        if event["type"] == "checkout.session.completed":
            order_id = event['data']['object']['metadata']['order_id']
            order = get_object_or_404(Order, id=int(order_id))
            order.status = 'paid'
            order.save()
    
        else:
            print('Unhandled event type {}'.format(event['type']))
            
        return HttpResponse(status=200)
