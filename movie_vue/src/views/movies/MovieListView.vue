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
        <div v-for="(movie, index) in calData" :key="index" class="card col-3 hover2" style="width: 100%;">
            <router-link class="text-decoration-none" :to="{ name: 'MovieDetail', params: { movie_id: movie.id } }">
              <img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" class="card-img-top" alt="movie_poster">
              <div class="card-body">
                 <h4 style="color: #414a4c">{{ movie.title }}</h4>
              </div>
          </router-link>
        </div>
      </div>
      <br>
      <v-pagination 
        v-model="curPageNum"
        circle="circle" 
        :length="numOfPages"
        color="#414a4c"
        page="9"
        total-visible="9">
      </v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MovieListView',
  data() {
    return {
      search: '',
      dataPerPage: 8,
      curPageNum: 1,
    }
  },
  computed: {
    ...mapState([
      'movies',
      'currentUsername',
    ]),
    startOffset() {
      return ((this.curPageNum-1)*this.dataPerPage)
    },
    endOffset() {
      return (this.startOffset + this.dataPerPage)
    },
    numOfPages() {
      return Math.ceil(this.movies.length / this.dataPerPage)
    },
    calData() {
      return this.movies.slice().reverse().slice(this.startOffset, this.endOffset)
    }
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
<style scoped>
.hover2:hover {
  background-color: #aaaaaa;
}
</style>