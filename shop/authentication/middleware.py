from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: self.get_user_jwt(request))
        return self.get_response(request)

    def get_user_jwt(self, request):
        user = get_user(request)
        if user.is_authenticated:
            return user
        try:
            auth_tuple = JWTAuthentication.authenticate(request)
            if auth_tuple:
                return auth_tuple[0]
        except:
            pass
        return user
