from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from django_filters.rest_framework import DjangoFilterBackend

from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .filters import ProductFilterset
from .models import *
from .serializers import *
from .pagination import ProductPaginator


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    pagination_class = ProductPaginator
    permission_classes = (AllowAny, )
    filter_backends = (DjangoFilterBackend, )
    filterset_class = ProductFilterset
    ordering_fields = ('price', 'rating')
    lookup_field = 'slug'
    lookup_url_kwarg = 'product_slug'

    @method_decorator(cache_page(30))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def add_product_in_cart(self, request, *args, **kwargs):
        product_slug = request.data.get('product_slug')
        quantity = int(request.data.get('quantity'))

        if not (quantity and product_slug):
            return Response({"error": "Missing required fields: product_slug or quantity"}, status=400)
        
        product = get_object_or_404(Product, slug=product_slug)

        if product.quantity == 0:
            return Response({"error": "Out of stock"}, status=400)

        if quantity > product.quantity:
            return Response({"error": "Quantity exceeds available stock"}, status=400)

        with transaction.atomic():
            product.quantity = F("quantity") - quantity
            product.save()
            product.refresh_from_db()
        serializer = CartProductSerializer(product, context={'request': request})
        return Response({"cart_product": serializer.data}, status=200)

    def remove_product_from_cart(self, request, *args, **kwargs):
        product_slug = request.data.get('product_slug')
        quantity = request.data.get('quantity')

        if not (quantity and product_slug):
            return Response({"error": "Missing required fields: product_slug or quantity", "status": 400})

        product = get_object_or_404(Product, slug=product_slug)
        product.quantity = F("quantity") + quantity
        product.save()
        product.refresh_from_db()

        serializer = ProductSerializer(product)
        return Response({'product': serializer.data} ,status=200)

    def get_queryset(self):
        return Product.objects.select_related('category').prefetch_related('tags')


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny, )

    @method_decorator(cache_page(15 * 60))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class TagListAPIView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (AllowAny, )

    @method_decorator(cache_page(15 * 60))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
