from django.urls import path

from .views import *

app_name = 'reviews'

urlpatterns = [
    path('<slug:product_slug>/', ReviewListCreateAPIView.as_view(), name='list-create'),
    path('<slug:product_slug>/delete/', ReviewUpdateDestroyAPIView.as_view(), name='destroy'),
]
