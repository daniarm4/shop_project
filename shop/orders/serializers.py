from rest_framework import serializers

from .models import *


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField(method_name='get_products')

    class Meta:
        model = Order
        fields = ('id', 'customer', 'status', 'address', 'products')
    
    def get_products(self, obj):
        products = obj.order_items.prefetch_related('product').values(
            'product__id',
            'product__name',
            'price',
            'quantity'
            )
        return products
