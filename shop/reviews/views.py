from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from django.shortcuts import get_object_or_404

from products.models import Product
from .serializers import ReviewSerializer
from .models import Review


class ReviewListCreateAPIView(ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        product_slug = self.kwargs.get('product_slug')
        queryset = Review.objects.filter(product__slug=product_slug)
        return queryset

    def create(self, request, *args, **kwargs):
        product_slug = self.kwargs.get('product_slug')
        product = get_object_or_404(Product, slug=product_slug)
        user = request.user
        data = request.data
        review, _ = Review.objects.get_or_create(user=user,
                                                 product=product,
                                                 defaults={
                                                     'text': data['text'],
                                                     'rate': data['rate'],
                                                 })
        serializer = ReviewSerializer(review)
        return Response(data=serializer.data, status=204)

    def get_permissions(self):
        if self.request.method.lower() == 'get':
            self.permission_classes = (AllowAny, )
        return super().get_permissions()


class ReviewUpdateDestroyAPIView(DestroyAPIView):
    serializer_class = ReviewSerializer

    def get_object(self):
        product_slug = self.kwargs.get('product_slug')
        product = get_object_or_404(Product, slug=product_slug)
        user = self.request.user
        review = get_object_or_404(Review, product=product, user=user)
        return review
