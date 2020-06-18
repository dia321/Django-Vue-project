from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Movie, Rank
from .serializers import MovieSerializer, RankSerializer


@api_view(['GET'])
def index(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def search(request):
    movies = Movie.objects.filter(title__icontains=request.data['search'])
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    serializer = MovieSerializer(data=request.data)
    if request.user.is_superuser:
      if serializer.is_valid(raise_exception=True):
          serializer.save()
          return Response(serializer.data)

@api_view(['GET'])
def detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.user.is_superuser:
        movie.delete()
        return Response({})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.user.is_superuser:
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)
    else:
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def liked(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.like_users.filter(id=request.user.pk).exists():
        liked=True
    else:
        liked=False
    return Response({'liked': liked, 'count': movie.like_users.count()})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.like_users.filter(id=request.user.pk).exists():
        movie.like_users.remove(request.user)
        liked=False
    else:
        movie.like_users.add(request.user)
        liked=True
    return Response({'liked': liked, 'count': movie.like_users.count()})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ranked(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.ranks.filter(user_id=request.user.pk).exists():
        ranked=True
    else:
        ranked=False
    print(ranked)
    return Response({ 'ranked': ranked })

@api_view(['GET'])
def l_rank(request, movie_pk):
    rank = Rank.objects.filter(movie_id=movie_pk)
    serializer = RankSerializer(rank, many=True)
    print(serializer)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def c_rank(request, movie_pk):
    movie=get_object_or_404(Movie, pk=movie_pk)
    movie2 = {'id': movie_pk, 'title':movie.title }
    request.data['movie'] = movie2
    serializer = RankSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user = request.user, movie=movie)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def d_rank(request, movie_pk, rank_pk):
    rank = get_object_or_404(Rank, pk=rank_pk)
    if rank.user==request.user:
        rank.delete()
        return Response({})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def u_rank(request, movie_pk, rank_pk):
    rank = get_object_or_404(Rank, pk=rank_pk)
    if rank.user==request.user:
        rank.content=request.data['content']
        print(request.data)
        rank.score=int(request.data['score'])
        rank.save()
        return Response({})


