from django.db import models
from django.conf import settings
# Create your models here.

class Genre(models.Model):
    name = models.CharField(max_length=100)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    original_title = models.CharField(max_length=100, null=True)
    release_date = models.DateField()
    popularity = models.FloatField(null=True)
    vote_count = models.IntegerField(null=True)
    vote_average = models.FloatField()
    adult = models.BooleanField(null=True)
    overview = models.TextField()
    original_language = models.CharField(max_length=100, null=True)
    poster_path = models.CharField(max_length=100, null=True)
    backdrop_path = models.CharField(max_length=100, null=True)
    genres = models.ManyToManyField(Genre, related_name = 'movies')
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies', blank=True)

class Rank(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name='ranks', on_delete = models.CASCADE)
    score = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
