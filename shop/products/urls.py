from django.urls import path

from .views import *

app_name = 'products'

product_list = ProductViewSet.as_view({'get': 'list'})
product_detail = ProductViewSet.as_view({'get': 'retrieve'})
add_product_in_cart = ProductViewSet.as_view({'post': 'add_product_in_cart'})
remove_product_from_cart = ProductViewSet.as_view({'post': 'remove_product_from_cart'})

urlpatterns = [
    path('', product_list, name='product_list'),
    path('product/<slug:product_slug>/', product_detail, name='product_detail'),
    path('categories/', CategoryListAPIView.as_view(), name='category_list'),
    path('tags/', TagListAPIView.as_view(), name='tag_list'),
    path('cart/add/', add_product_in_cart, name='cart_add'),
    path('cart/remove/', remove_product_from_cart, name='cart_remove'),
]
