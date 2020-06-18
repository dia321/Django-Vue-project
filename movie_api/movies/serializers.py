from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Movie, Rank

class MovieSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    class Meta:
        model = Movie
        fields = '__all__'

class MovieRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title',)

class RankSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    movie = MovieRankSerializer(required=False)
    class Meta:
        model = Rank
        fields = '__all__'