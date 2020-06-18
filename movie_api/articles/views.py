from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Article, Comment
from .serializers import ArticleSerializer, CommentSerializer


@api_view(['GET'])
def index(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    serializer = ArticleSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data)


@api_view(['GET'])
def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if article.user==request.user or request.user.is_superuser:
        article.delete()
        return Response({})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if article.user==request.user:
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['GET'])
def l_comment(request, article_pk):
    comment = Comment.objects.filter(article_id=article_pk)
    serializer = CommentSerializer(comment, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def c_comment(request, article_pk):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):     
        serializer.save(user = request.user)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def d_comment(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if comment.user==request.user or request.user.is_superuser:
        comment.delete()
        return Response({})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def u_comment(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if comment.user==request.user:
        comment.content=request.data['content']
        comment.save()
        return Response({})