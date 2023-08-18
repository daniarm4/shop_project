from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from django.urls import path

from .views import UserViewSet

app_name = 'authentication'

user = UserViewSet.as_view({'get': 'user'})
user_list = UserViewSet.as_view({'get': 'list'})
user_detail = UserViewSet.as_view({'get': 'retrieve'})
user_update = UserViewSet.as_view({'put': 'user', 'patch': 'user'})
user_logout = UserViewSet.as_view({'post': 'logout'})
user_register = UserViewSet.as_view({'post': 'create'})

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='obtain-pair-token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('logout/', user_logout, name='logout'),
    path('register/', user_register, name='register'),
    path('user/', user, name='user'),
    path('user/update/', user_update, name='update'),
    path('users/<slug:username>/', user_detail, name='detail'),
    path('users/', user_list, name='list'),
]
