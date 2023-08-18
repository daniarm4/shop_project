from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from .manager import UserManager


class User(PermissionsMixin, AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True, verbose_name=_('email'))
    username = models.CharField(max_length=255, unique=True, db_index=True, verbose_name=_('username'))
    phone_number = PhoneNumberField(unique=True, verbose_name=_('phone number'))
    is_staff = models.BooleanField(default=False, verbose_name=_('staff'))
    is_active = models.BooleanField(default=True, verbose_name=_('active'))

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
