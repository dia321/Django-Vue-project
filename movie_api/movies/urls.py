from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.index, name='index'),
    path('search/', views.search, name='search'),
    path('create/', views.create, name='create'),
    path('<int:movie_pk>/', views.detail, name='detail'),
    path('<int:movie_pk>/update/', views.update, name='update'),
    path('<int:movie_pk>/delete/', views.delete, name='delete'),
    path('<int:movie_pk>/liked/', views.liked, name='liked'),
    path('<int:movie_pk>/like/', views.like, name='like'),

    path('<int:movie_pk>/ranked/', views.ranked, name='ranked'),
    path('<int:movie_pk>/l_rank/', views.l_rank, name='l_rnak'),
    path('<int:movie_pk>/c_rank/', views.c_rank, name='c_rank'),
    path('<int:movie_pk>/<int:rank_pk>/d_rank/', views.d_rank, name='d_rank'),
    path('<int:movie_pk>/<int:rank_pk>/u_rank/', views.u_rank, name='u_rank'),
]