from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    role = models.CharField(verbose_name='role', max_length=255)

    profile_image = models.ImageField(
        verbose_name='profile_image',
        blank=True,
    )
