<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-transparent">
      <router-link class="navbar-brand" :to="{ name: 'About' }"><i class="fas fa-video"></i> BI Films </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="justify-content-between collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'ArticleList' }"><i class="fas fa-book-open"></i> 게시판</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'MovieList' }"><i class="fas fa-list"></i> 영화 목록</router-link>
          </li>
          <li class="nav-item">
            <a href="https://ticket.movie.naver.com/Ticket/Reserve.aspx"><i class="far fa-calendar-check"></i> 영화 예매</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'Recommend' }"><i class="far fa-thumbs-up"></i> 영화 추천</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'Signup' }"><i class="fas fa-user-plus"></i> 회원가입</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'Login' }"><i class="fas fa-user-check"></i> 로그인</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            {{ currentUsername }} 님 환영합니다 !!
            <router-link v-if="currentUsername=='admin'" :to="{ name: 'Config'}">
            <i class="fas fa-user-cog" style="cursor:pointer;"></i> 유저 관리
            </router-link>
            <router-link :to="{ name: 'Profile', params: { username: currentUsername } }">
            <i class="fas fa-user-circle" style="cursor:pointer;"></i> 프로필
            </router-link>
            <router-link :to="{ name: 'Logout' }"><i class="fas fa-user-times"></i> 로그아웃</router-link>
          </li>
        </ul>
      </div>
    </nav>   
    <router-view/>
    <!-- <div class="pull-right fixed-bottom d-flex justify-content-end"> -->
      <button class="btn m-3" style="position:fixed; right: 5px; bottom: 5px; color: #414a4c; border: solid 2px #414a4c; border-radius: 15px;" @click="top"><i class="fas fa-angle-double-up"></i></button>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App', 
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
    ...mapState([
      'currentUsername',
    ])
  },
  methods: {
    top() {
      window.scrollTo(0,0)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: black;
  padding: 10px;
}

#nav a.router-link-exact-active {
  color: #ff0000;
}
</style>