from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from products.models import Product

User = get_user_model()


class Order(models.Model):
    STATUS_CHOICES = (
        ('not_paid', _('Not paid')),
        ('paid', _('Paid')),
    )

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', verbose_name=_('customer'))
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, verbose_name=_('status of order'))
    address = models.CharField(max_length=255, verbose_name=_('address'))

    def __str__(self):
        return f'Order #{self.id}'

    class Meta:
        verbose_name = _('order')
        verbose_name_plural = _('orders')


class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items', verbose_name=_('order'))
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items', verbose_name=_('product'))
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('price in cents'))
    quantity = models.PositiveIntegerField(verbose_name=_('quantity'))

    def __str__(self):
        return f'Item #{self.id} of order #{self.order.id}'

    class Meta:
        verbose_name = _('order item')
        verbose_name_plural = _('order items')
        unique_together = ('order', 'product')
