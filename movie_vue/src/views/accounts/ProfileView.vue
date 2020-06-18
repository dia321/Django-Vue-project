<template>
  <div>
    <h4><i class="fas fa-user-circle"></i> 프로필</h4>
    <br>
    <br>
    <h5>{{ username }} 가 좋아요 한 영화</h5>
    <div class="container w-50 mx-auto">
      <router-link v-for="movie in user_movies" :key="movie.title" class="btn btn-outline-info btn-sm m-1" :to="{ name: 'MovieDetail', params: { movie_id: movie.id } }">{{ movie.title }}</router-link>
    </div>  
    <br>
    <h5>{{ username }} 가 평점 적은 영화</h5>
    <div class="container">
      <div class="input-group mb-3 mx-auto" v-for="rank in user_ranks" :key="rank.created_at">
        <div class="input-group-prepend">
          <router-link class="input-group-text text-left text-decoration-none text-dark bg-light" :to="{ name: 'MovieDetail', params: { movie_id: rank.movie.id} }">{{ rank.movie.title }}</router-link>
          <span class="input-group-text">{{ rank.score }}</span>
        </div>
        <input :value="rank.content" disabled class="text-left text-decoration-none text-dark form-control">
          <!-- <p class="input-group-text">제목: {{ rank.movie.title }} | 평점: {{ rank.score }} | 한줄평: {{ rank.content }}</p> -->
      </div>
    </div>
    <br>
    <h5>{{ username }} 가 작성한 게시글</h5>
    <div class="container">
      <div class="mx-auto">
        <router-link v-for="article in user_articles" :key="article.created_at" class="form-control input-group-text text-left text-decoration-none text-dark bg-light" :to="{ name: 'ArticleDetail', params: { article_id: article.id } }">{{ article.title }}</router-link>
      </div>  
    </div>
    <br>
    <h5>{{ username }} 가 작성한 댓글</h5>
    <div class="container">
      <div class="input-group mb-3 mx-auto" v-for="comment in user_comments" :key="comment.created_at">
        <router-link class="form-control input-group-text text-left text-decoration-none text-dark bg-light" :to="{ name: 'ArticleDetail', params: { article_id: comment.article} }">{{ comment.content }}</router-link>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProfileView',
  data() {
    return {
      username: this.$route.params.username,
    }
  },
  computed: {
    ...mapState([
      'user_movies',
      'user_ranks',
      'user_articles',
      'user_comments',
    ])
  },
  methods: {
    ...mapActions([
      'fetchProfile',
    ])
  },
  created() {
    this.fetchProfile(this.username)
  }
}
</script>

<style>

</style>