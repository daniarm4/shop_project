from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.contrib.auth import get_user_model, logout

from .serializers import UserSerializer, UserCreateSerializer

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

    @method_decorator(cache_page(60))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def user(self, request, *args, **kwargs):
        method = request.method.lower()
        match method:
            case 'patch':
                return self.partial_update(request, *args, **kwargs)
            case 'put':
                return self.update(request, *args, **kwargs)
            case 'get':
                return self.retrieve(request, *args, **kwargs)

    def logout(self, request, *args, **kwargs):
        refresh_token = RefreshToken(request.data.get('refresh'))
        refresh_token.blacklist()
        logout(request)
        return Response(status=204)

    def get_object(self):
        if self.action == 'user':
            return self.request.user
        return super().get_object()

    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            return UserCreateSerializer(*args, **kwargs)
        return super().get_serializer(*args, **kwargs)

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = (AllowAny, )
        if self.action in ('list', 'retrieve'): 
            self.permission_classes = (IsAdminUser, )
        return super().get_permissions()
