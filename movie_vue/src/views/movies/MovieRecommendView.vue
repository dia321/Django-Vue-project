<template>
  <div>
    <h4><i class="far fa-thumbs-up"></i> 영화 추천</h4>
    <br>
    <br>
    <h5>지금 당신에게 추천하는 영화</h5>
    <div v-if="user_movies!='' && user_ranks!=''" class="w-50 mx-auto">
      <router-link v-for="r in recommend" :key="r.title" class="btn btn-outline-danger btn-sm m-1" :to="{ name: 'MovieDetail', params: { movie_id: r.id } }">{{ r.title }}</router-link>
    </div>      
    <div v-if="user_movies==''">
      <p></p>
      <p>좋아하는 영화가 없나요?</p>
      <p>선호하는 영화를 찾아서 좋아요 표시를 해주세요</p>
    </div>
    <div v-if="user_ranks==''"> 
      <p></p>
      <p>감명깊게 본 영화가 있나요?</p>
      <p>영화를 평가해주세요</p>
    </div>
    <br>
    <div v-if="user_movies!=''" class="w-50 mx-auto">      
      <h5><span style="color:crimson;">❤</span> 내가 좋아하는 영화</h5>
      <router-link v-for="movie in user_movies" :key="movie.title" class="btn btn-outline-info btn-sm m-1" :to="{ name: 'MovieDetail', params: { movie_id: movie.id } }">{{ movie.title }}</router-link>
    </div>
    <br>
    <div v-if="user_ranks!=''">
      <h5>📜 내가 평점 적은 영화</h5>
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MovieRecommendView',
  computed: {
    ...mapState([
      'user_movies',
      'user_ranks',
      'currentUsername',
      'recommend',
    ])
  },
  methods: {
    ...mapActions([
      'fetchProfile',
      'fetchRecommend',
    ])
  },
  created() {
    this.fetchProfile(this.currentUsername)
    this.fetchRecommend(this.currentUsername)
  }
}
</script>

<style>

</style>