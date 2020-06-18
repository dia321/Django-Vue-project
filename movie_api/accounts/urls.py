from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('superuser/', views.superuser, name='superuser'),
    path('profile/<str:username>/', views.profile, name='profile'),
    path('config/', views.config, name='config'),
    path('delete/<int:user_id>/', views.userdelete, name='userdelete'),
    path('recommend/<str:username>/', views.recommend, name='recommend'),
]