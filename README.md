<h4>팀원 정보 및 업무 분담 내역</h4>

김성민 - 기본적으로 장고, 뷰 함께 구현 + 모델링 관련

김세훈 - 기본적으로 장고, 뷰 함께 구현 + 구현 관련

<h4>목표 서비스 구현 및 실제 구현 정도</h4>

우선적으로 필수기능을 모두 포함하여 페이지가 원활하게 작동하는 것을 목표로 하였다.

목표했던 기능들은 다 추가하여 원활하게 작동하였다. 

하지만 영화 데이터를 한번에 받아오게 되어 로딩에 시간이 좀 걸렸고, 페이지네이션 이동 후 영화 검색을 하면 페이지네이션의 첫 페이지로 돌아오지 않는 등 서비스 이용에 불편을 느낄만한 문제가 몇몇 존재한다.    

<h4>데이터베이스 모델링(ERD)</h4>

<strong>영화</strong>(< - 장르), (< - 평점) < -- > <strong>사용자</strong>(< - 평점, 게시글, 댓글 ) < -- > <strong>게시글, 댓글</strong>(< - 사용자)

```python
# movies/model.py

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

```

```python
## accounts/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie

class User(AbstractUser):
    rank_movie = models.ManyToManyField(
      Movie,
      related_name='rank_user',
    )

```

```python
## articles/models.py

from django.db import models
from django.conf import settings


class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, related_name='comments', on_delete = models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

```

<h4>필수 기능</h4>

1. 관리자 뷰

  Django 내에서 함수 is_superuser를 사용하여 관리자 계정으로 로그인시에만 영화 등록 / 수정 / 삭제가 가능하도록 하였고 vue의 템플릿 작성 시에도 관리자로 로그인 시에만 영화 추가 버튼이 보이게 했다. 이와 비슷하게 유저 탈퇴 권한에 대한 유저 관리 페이지도 구성하였다.

2. 영화 정보

  기존 Django 프로젝트에서 썼었던 영화 데이터 json 파일을 받아 500개의 영화 정보를 구성하였다. 로그인 된 유저만 평점 등록 / 수정 /삭제 및 좋아요를 구현하였다.

3. 추천 알고리즘

   좋아요한 영화 중 하나를 랜덤으로 뽑아 그 영화의 장르 중 하나를 고른 후, 해당 장르의 영화들 중  좋아요한 영화들의 평균 평점보다 높은 영화들만 걸러내어 그 중 기존 좋아요, 평점 작성한 영화 제외한 5개의 영화가 추천되도록 알고리즘을 구성하였다.

4. 커뮤니티
   

  로그인 한 사용자만 글을 조회 / 생성 할 수 있고 본인만 글을 수정 / 삭제 할 수 있도록 하였다. 로그인 한 사용자만 게시글에 댓글을 작성할 수 있고 작성자 본인만 댓글을 수정 / 삭제 할 수 있도록 하였다. 각 게시글과 댓글에는 생성 / 수정 시각 정보를 포함하였다. 게시글 pagination을 구현하였다.

5. 기타

     5개 넘는 URL 및 페이지를 구성하였고 에러 페이지는 alert를 활용하였다. 비동기 요청을 통해 사용자가 페이지를 이용할 수 있도록 하였다.

<h4>배포 서버 URL</h4>

http://bucketforseomi.s3-website.ap-northeast-2.amazonaws.com/

<h4>기타(느낀점)</h4>

그동안에도 페어프로젝트를 계속 진행해왔지만 최종 프로젝트인 만큼 시간도 많이 걸리고 어려운 점도 많이 부딪힌 프로젝트였다. 좀 더 시간이 주어진다면 더 완성도 높은 웹페이지를 만들 수 있을 것 같지만 목표했던 기한에 맞춰 프로젝트를 완성시키는 것도 중요한 요소 중 하나이기 때문에 마무리짓게 되어 아쉽다.