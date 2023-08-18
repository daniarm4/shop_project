from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):  
    username = serializers.CharField(source='user.username') 

    class Meta:
        model = Review
        fields = ('product', 'username', 'rate', 'text', 'created_at', 'updated_at')
