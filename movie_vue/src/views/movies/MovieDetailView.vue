<template>
  <div class="container">
    <h1 class="text-left"><strong>{{ movie.title }}</strong></h1>
    <h4 class="text-left">
      <strong>평점</strong> <span class="badge badge-warning">{{ movie.vote_average }}</span> | <strong>개봉일</strong> {{ movie.release_date }} | <strong>장르</strong> <span class="badge badge-secondary p-1 mx-1" v-for="genre in movie.genres" :key="genre"> {{ genre_name[genre] }}</span>
    <span v-if="isLoggedIn" @click="fetchLike(movie_id)" style="cursor:pointer"> | 
      <i v-show="liked" class="fas fa-heart fa-lg animated delay-1s like-button" style="color: crimson;"></i>
      <i v-show="!liked" class="fas fa-heart fa-lg animated infinite bounce delay-1s like-button" style="color: gray;"></i>
     {{ count }}명이 좋아합니다.
    </span>
    </h4>
    <hr>
    <img :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`" class="card-img-top" width="100%" alt="movie_poster">
    <hr>
    <div class="embed-responsive embed-responsive-16by9">
      <iframe 
        class="embed-responsive-item" 
        width="560" 
        height="315" 
        :src="trailer"
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
    <hr>
    <div class="w-50 mx-auto">
      <p class="text-left justify-content-center">{{ movie.overview }}</p>
    </div>
    <!-- {{ movie }} -->
    <router-link class="btn btn-primary btn-sm" :to="{ name: 'MovieList' }">목록으로</router-link>
    <router-link v-if="currentUsername=='admin'" class="btn btn-warning btn-sm" :to="{ name: 'MovieUpdate', params: { movie_id: movie_id } }">수정하기</router-link>
    <router-link v-if="currentUsername=='admin'" class="btn btn-danger btn-sm" :to="{ name: 'MovieDelete', params: { movie_id: movie_id } }">삭제하기</router-link>
    <hr>
    <RankCreateView v-if="!ranked.ranked" />
    <RankListView />
    <br>
    <br>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import RankCreateView from './RankCreateView.vue'
import RankListView from './RankListView.vue'

export default {
  name: 'MovieDetailView',
  components: {
    RankCreateView,
    RankListView,
  },
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      trailer_url: '',
    }
  },
  computed: {
    ...mapState([
      'movie',
      'genre_name',
      'liked',
      'count',
      'currentUsername',
      'ranked',
      'trailer',
    ]),
    ... mapGetters([
      'isLoggedIn',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchMovie', 'fetchLike', 'fetchLiked', 'fetchRanked'
    ]),
  },
  created() {
    this.fetchMovie(this.movie_id)
    this.fetchLiked(this.movie_id)
    this.fetchRanked(this.movie_id)
    window.scrollTo(0,0)
  },
}
</script>

<style>

</style>