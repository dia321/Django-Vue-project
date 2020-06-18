from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie

class User(AbstractUser):
    rank_movie = models.ManyToManyField(
      Movie,
      related_name='rank_user',
    )