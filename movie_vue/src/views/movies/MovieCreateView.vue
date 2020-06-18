<template>
  <div>
    <h1>영화 추가하기</h1>
    <div class="container">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon1">제목</span>
        </div>
        <input v-model="movieData.title" type="text" class="form-control bg-dark text-light" placeholder="Title" aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon1">개봉일</span>
        </div>
        <input v-model="movieData.release_date" type="date" class="form-control bg-dark text-light" placeholder="Release_Date" aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">평점</span>
        </div>
        <input v-model="movieData.vote_average" type="text" class="form-control bg-dark text-light" placeholder="Vote_Average" aria-describedby="basic-addon2">
      </div>


      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">줄거리</span>
        </div>
        <textarea v-model="movieData.overview" type="text" cols="30" rows="5" class="form-control bg-dark text-light" placeholder="Overview" aria-describedby="basic-addon2"></textarea>
      </div>

      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">포스터</span>
        </div>
        <input v-model="movieData.poster_path" type="text" class="form-control bg-dark text-light" placeholder="/..." aria-describedby="basic-addon2">
      </div>

      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">배경이미지</span>
        </div>
        <input v-model="movieData.backdrop_path" type="text" class="form-control bg-dark text-light" placeholder="/..." aria-describedby="basic-addon2">
      </div> 
    
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">장르</span>
        </div>
      </div>
    
      <input type="checkbox" id="12" value="12" v-model="movieData.genres">
      <label for="12">Adventure </label> |
      <input type="checkbox" id="14" value="14" v-model="movieData.genres">
      <label for="14">Fantasy </label> | 
      <input type="checkbox" id="16" value="16" v-model="movieData.genres">
      <label for="16">Animation </label> |
      <input type="checkbox" id="18" value="18" v-model="movieData.genres">
      <label for="18">Drama </label> |
      <input type="checkbox" id="27" value="27" v-model="movieData.genres">
      <label for="27">Horror </label> |
      <input type="checkbox" id="28" value="28" v-model="movieData.genres">
      <label for="28">Action </label> |
      <input type="checkbox" id="35" value="35" v-model="movieData.genres">
      <label for="35">Comedy </label> |
      <input type="checkbox" id="36" value="36" v-model="movieData.genres">
      <label for="36">History </label> |
      <input type="checkbox" id="37" value="37" v-model="movieData.genres">
      <label for="37">Western </label> |
      <input type="checkbox" id="53" value="53" v-model="movieData.genres">
      <label for="53">Thriller </label> |
      <input type="checkbox" id="80" value="80" v-model="movieData.genres">
      <label for="80">Crime </label> |
      <br>
      <input type="checkbox" id="99" value="99" v-model="movieData.genres">
      <label for="99">Documentary </label> |
      <input type="checkbox" id="878" value="878" v-model="movieData.genres">
      <label for="878">Science Fiction </label> |
      <input type="checkbox" id="9648" value="9648" v-model="movieData.genres">
      <label for="9648">Mystery </label> |
      <input type="checkbox" id="10402" value="10402" v-model="movieData.genres">
      <label for="10402">Music </label> |
      <input type="checkbox" id="10749" value="10749" v-model="movieData.genres">
      <label for="10749">Romance </label> |
      <input type="checkbox" id="10751" value="10751" v-model="movieData.genres">
      <label for="10751">Family </label> |
      <input type="checkbox" id="10752" value="10752" v-model="movieData.genres">
      <label for="10752">War </label> |
      <input type="checkbox" id="10770" value="10770" v-model="movieData.genres">
      <label for="10770">TV Movie </label>
 
      <br>
      <button class="btn btn-primary btn-sm" @click="createMovie(movieData)">작성하기</button>
      <router-link class="btn btn-danger btn-sm" :to="{ name: 'MovieList' }">취소</router-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MovieCreateView',
  data() {
    return {
      movieData: {
        title: null,
        release_date: null,
        vote_average: null,
        adult: null,
        overview: null,
        poster_path: null,
        backdrop_path: null,
        genres: [],
      },
    }
  },
  methods: {
    ...mapActions([
      'createMovie',
    ])
  },
  computed: {
    ...mapState([
      'genre_name',
    ]),
  }
}
</script>

<style>