import django_filters

from .models import Product


class ProductFilterset(django_filters.FilterSet):
    tags = django_filters.CharFilter(method='tags_filter')
    in_stock = django_filters.BooleanFilter(method='in_stock_filter')
    ordering = django_filters.OrderingFilter(
        fields=(
                ('price', 'price'),
                ('quantity', 'quantity'),
            )
    )

    class Meta:
        model = Product
        fields = ('tags', 'category__name', )

    def tags_filter(self, queryset, name, value):
        tag_names = value.split(',')
        return queryset.filter(tags__name__in=tag_names)

    def in_stock_filter(self, queryset, name, value):
        if value:
            return queryset.filter(quantity__gt=0)
        return queryset
