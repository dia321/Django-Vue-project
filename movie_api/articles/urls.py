from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('<int:article_pk>/', views.detail, name='detail'),
    path('<int:article_pk>/update/', views.update, name='update'),
    path('<int:article_pk>/delete/', views.delete, name='delete'),
    path('<int:article_pk>/l_comment/', views.l_comment, name='l_comment'),
    path('<int:article_pk>/c_comment/', views.c_comment, name='c_comment'),
    path('<int:article_pk>/<int:comment_pk>/d_comment/', views.d_comment, name='d_comment'),
    path('<int:article_pk>/<int:comment_pk>/u_comment/', views.u_comment, name='u_comment'),    
]