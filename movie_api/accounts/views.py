from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

from movies.models import Movie, Rank
from movies.serializers import MovieSerializer, RankSerializer
from .serializers import UserSerializer

from articles.models import Article, Comment
from articles.serializers import ArticleSerializer, CommentSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def superuser(request):
    if request.user.is_superuser:
        return Response({})

@api_view(['GET'])
def profile(request, username):
    user = get_object_or_404(User, username=username)
    movies = Movie.objects.filter(like_users=user.id)
    movie_serializer = MovieSerializer(movies, many=True)
    ranks = Rank.objects.filter(user=user.id)
    rank_serializer = RankSerializer(ranks, many=True)
    articles = Article.objects.filter(user=user.id)
    article_serializer = ArticleSerializer(articles, many=True)
    comments = Comment.objects.filter(user=user.id)
    comment_serializer = CommentSerializer(comments, many=True)
    return Response({'movies': movie_serializer.data, 
                    'ranks': rank_serializer.data, 
                    'articles': article_serializer.data, 
                    'comments': comment_serializer.data
                    })        


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def config(request):
    if request.user.is_superuser:
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def userdelete(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    if request.user.is_superuser or request.user==user:
        user.delete()
        return Response({})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def recommend(request, username):
    user = get_object_or_404(User, username=username)
    liked_movies = Movie.objects.filter(like_users=user.id)
    import random
    # 좋아요 한 영화 랜덤 1픽
    movie = random.choice(liked_movies)
    # 좋아요 한 영화들의 평균 평점
    sumval = 0
    for m in liked_movies:
        sumval += m.vote_average
    v = sumval/liked_movies.count()
    # 랜덤 1픽의 장르 랜덤 1픽
    genre = random.choice(movie.genres.all())
    # 평균 평점보다 높은 평점을 가진 영화들 불러옴
    picked_movies = Movie.objects.filter(vote_average__lte=v)
    # 선택한 장르이면서 좋아요, 평점 매긴 영화 제외하고 5개 선택
    recommends = picked_movies.filter(genres = genre).exclude(like_users=user.id).exclude(rank_user=user.id)[:5]
    movie_serializer = MovieSerializer(recommends, many=True)
    return Response(movie_serializer.data)
