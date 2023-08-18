from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator

from products.models import Product

User = get_user_model()


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', verbose_name=_('product'))
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews', verbose_name=_('user'))
    rate = models.PositiveIntegerField(verbose_name=_('rate'), validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField(null=True, blank=True, verbose_name=_('comment'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('create date'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('update date'))

    class Meta:
        verbose_name = _('review')
        verbose_name_plural = _('reviews')

    def __str__(self):
        return f'Отзыв на "{self.product.name}" от {self.user.username}'
