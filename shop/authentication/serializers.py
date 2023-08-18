from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'phone_number', 'is_staff')


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    re_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta(UserSerializer.Meta):
        fields = ('username', 'email', 'phone_number', 'password', 're_password')

    def create(self, validated_data):     
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )  
        return user
    
    def validate(self, attrs):
        password = attrs.get('password')
        re_password = attrs.get('re_password')
        
        if password != re_password:
            raise serializers.ValidationError({'password': 'Пароли не совпадают'})
        
        try: 
            validate_password(password)
        except serializers.ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})
        
        return attrs
