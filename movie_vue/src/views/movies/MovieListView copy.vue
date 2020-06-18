<template>
  <div class="container">
    <h4><i class="fas fa-list"></i> 영화 목록</h4>
      <br>
      <br>
      <div v-if="currentUsername=='admin'" class="d-flex justify-content-end">
        <button class="btn btn-primary btn-sm" @click="movieCreate">영화추가</button>
      </div>
      <br>
      <div class="input-group mb-3">
        <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="영화 제목" aria-label="Search">
        <button class="btn btn-success btn-sm my-2 my-sm-0 justify-content-end" @click="searchMovies2">검색</button>
      </div>
      <br>
      <div class="row">
        <div v-for="movie in movies.slice().reverse()" :key="`a_${movie.id}`" class="card col-3" style="width: 100%;">
            <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" class="card-img-top" alt="movie_poster">
          <div class="card-body">
            <h4>{{ movie.title }}</h4>
            <router-link class="btn btn-info btn-sm" :to="{ name: 'MovieDetail', params: { movie_id: movie.id } }">자세히</router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MovieListView',
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState([
      'movies',
      'currentUsername',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchMovies',
      'movieCreate',
      'searchMovies',
    ]),
    searchMovies2() {
      if (this.search) {
        this.searchMovies(this.search)
      }
    },
  },
  created() {
    this.fetchMovies()
  }
}
</script>
<style>

</style>