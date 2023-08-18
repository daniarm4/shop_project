from django.urls import path

from .views import *

app_name = 'orders'

urlpatterns = [
    path('list-create/', OrderListCreateAPIView.as_view(), name='list_create'),
    path('detail/<int:pk>/', OrderRetrieveAPIView.as_view(), name='detail'),
    path('create-checkout/', StripeCheckoutView.as_view(), name='create-checkout'),
    path('webhook', StripeWebhook.as_view(), name='stripe-webhook'),
]
