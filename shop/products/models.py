from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from uuid import uuid4

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=155, verbose_name=_('name'))

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=155, verbose_name=_('name'))

    class Meta:
        verbose_name = _('tag')
        verbose_name_plural = _('tags')

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products', verbose_name=_('category'))
    tags = models.ManyToManyField(Tag, blank=True, related_name='products', verbose_name=_('tags'))
    slug = models.SlugField(blank=True, unique=True, verbose_name=_('slug'))
    name = models.CharField(max_length=155, verbose_name=_('product name'))
    description = models.TextField(verbose_name=_('description'))
    image = models.ImageField(upload_to='product_images/', verbose_name=_('image'))
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('price in cents'))
    quantity = models.PositiveIntegerField(default=1, verbose_name=_('quantity of products'))

    @property
    def rating(self):
        avg_rating = self.reviews.aggregate(models.Avg('rate')).get('rate__avg')
        return round(avg_rating, 2) if avg_rating is not None else 0

    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')

    def __str__(self):
        return self.name 

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = slugify(self.name)
            while Product.objects.filter(slug=slug).exists():
                slug = f'{slug}-{str(uuid4()[:2])}'
            self.slug = slug

        super(Product, self).save(*args, **kwargs)
