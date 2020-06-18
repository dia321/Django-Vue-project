import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import cookies from 'vue-cookies'

import router from '@/router'
import SERVER from '@/api/drf'

Vue.use(Vuex)

const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY2

export default new Vuex.Store({
  state: {
    authToken: cookies.get('auth-token'),
    articles: [],
    article: {},
    comments: [],
    movies: [],
    movie: {},
    genre_name: {
      12: 'Adventure',
      14: 'Fantasy',
      16: 'Animation',
      18: 'Drama',
      27: 'Horror',
      28: 'Action',
      35: 'Comedy',
      36: 'History',
      37: 'Western',
      53: 'Thriller',
      80: 'Crime',
      99: 'Documentary',
      878: 'Science Fiction',
      9648: 'Mystery',
      10402: 'Music',
      10749: 'Romance',
      10751: 'Family',
      10752: 'War',
      10770: 'TV Movie',
    },
    liked: false,
    ranked: false,
    count: 0,
    currentUsername: cookies.get('username'),
    ranks: [],
    user_movies: [],
    user_ranks: [],
    user_articles: [],
    user_comments: [],
    users: [],
    recommend: [],
    trailer: '',
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    currentusername: state => state.username,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}})
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_ARTICLE(state, article) {
      state.article = article
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments
    },
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
    SET_MOVIE(state, movie) {
      state.movie = movie
    },
    SET_LIKES(state, data) {
      state.liked = data.liked
      state.count = data.count
    },
    SET_USERNAME(state, username) {
      state.currentUsername = username
      cookies.set('username', username)
    },
    SET_RANKS(state, ranks) {
      state.ranks = ranks
    },
    SET_RANKED(state, ranked) {
      state.ranked = ranked
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_PROFILE(state, data) {
      state.user_movies = data.movies
      state.user_ranks = data.ranks
      state.user_articles = data.articles
      state.user_comments = data.comments
    },
    SET_RECOMMEND(state, recommend) {
      state.recommend = recommend
    },
    SET_TRAILER(state, trailer) {
      state.trailer = trailer
    },
  },
  actions: {
    movieCreate({ getters }) {
      axios.post(SERVER.URL + SERVER.ROUTES.superuser, null, getters.config)
          .then(() => router.push({ name: 'MovieCreate'}))
          .catch(err => {
            alert('관리자에게 요청하세요!!')
            console.error(err)
          })
    },
    auth({ commit }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          commit('SET_USERNAME', info.data.username)
          router.push({ name: 'About' })
        })
        .catch(err => {
          console.error(err.response.data)
          alert('다시 확인해주세요')
        })
    },
    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        location: SERVER.ROUTES.signup
      }
      dispatch('auth', info)
    },
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        location: SERVER.ROUTES.login
      }
      dispatch('auth', info)
    },
    logout({ commit, getters }) {
      axios.post(SERVER.URL + SERVER.ROUTES.logout, null, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          commit('SET_USERNAME', null)
          cookies.remove('auth-token')
          cookies.remove('username')
          router.push({ name: 'About' })
        })
        .catch(err => console.error(err))
    },
    deleteAccount({ getters }, user_id ) {
      console.log(SERVER.URL + SERVER.ROUTES.userdelete + user_id +'/')
      axios.post(SERVER.URL + SERVER.ROUTES.userdelete + user_id +'/', null, getters.config)
        .then(() => router.push({ name: 'Config' }))
        .catch(err => {
          console.error(err)
        })
    },
    fetchUsers({ getters, commit }) {
      axios.post(SERVER.URL + SERVER.ROUTES.config, null, getters.config)
        .then(res => commit('SET_USERS', res.data))
        .catch(err => console.error(err))
    },
    fetchProfile({ commit }, username ) {
      axios.get(SERVER.URL + SERVER.ROUTES.profile + username +'/')
        .then((res) => {
          commit('SET_PROFILE', res.data)
        })
        .catch(err => console.error(err))
    },
    // recommend
    fetchRecommend({ commit, getters}, username) {
      console.log(SERVER.ROUTES.recommend)
      console.log(SERVER.URL + SERVER.ROUTES.recommend + username +'/')
      axios.post(SERVER.URL + SERVER.ROUTES.recommend + username +'/', null, getters.config)
        .then(res => commit('SET_RECOMMEND', res.data))
        .catch(err => console.log(err.response.data))
    },
    // articles
    fetch({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.list)
        .then(res => commit('SET_ARTICLES', res.data))
        .catch(err => console.error(err))
    },
    fetchArticle({ commit }, article_id) {
      axios.get(SERVER.URL + SERVER.ROUTES.list + article_id)
        .then(res => commit('SET_ARTICLE', res.data))
        .catch(err => console.error(err))
    },
    createArticle({ getters }, articleData) {
      axios.post(SERVER.URL + SERVER.ROUTES.create, articleData, getters.config)
        .then((res) => router.push({ name: 'ArticleDetail', params: { article_id: res.data.id } }))
        .catch(err => console.error(err.response.data))
    },
    deleteArticle({ getters }, article_id ) {
      axios.post(SERVER.URL + SERVER.ROUTES.list + article_id + '/delete/', null, getters.config)
        .then(() => router.push({ name: 'ArticleList' }))
        .catch(err => {
          console.error(err)
          router.push({ name: 'ArticleDetail', params:{ article_id: article_id } })
          alert('본인이 쓴 글만 삭제할 수 있습니다')
        })
    },
    updateArticle({ getters }, articleData) {
      axios.put(SERVER.URL + SERVER.ROUTES.list + articleData.article_id + '/update/', articleData, getters.config)
        .then(() => router.push({ name: 'ArticleDetail' , params: { article_id: articleData.article_id } }))
        .catch(err => {
          console.error(err.response.data)
          router.push({ name: 'ArticleDetail' , params: { article_id: articleData.article_id } })
          alert('본인이 쓴 글만 수정할 수 있습니다')
        })
    },
    // articles_comment
    fetchComments({ commit }, article_id) {
      axios.get(SERVER.URL + SERVER.ROUTES.list + article_id + '/l_comment/')
        .then(res => commit('SET_COMMENTS', res.data))
        .catch(err => console.error(err))
    },
    createComment({ getters, dispatch }, commentData) {
    // createComment({ getters }, commentData) {
      axios.post(SERVER.URL + SERVER.ROUTES.list + commentData.article + '/c_comment/', commentData, getters.config)
        // .then(() => console.log(commentData))
        .then(() => dispatch('fetchComments', commentData.article))
        .catch(err => {
          router.push({name: 'Login'})
          console.log(commentData)
          console.error(err)})
    },
    deleteComment({ getters }, deleteData) {
      axios.post(SERVER.URL + SERVER.ROUTES.list + deleteData.article_id + '/' + deleteData.comment_id + '/d_comment/', null, getters.config)
        .then(() => router.push({ name: 'ArticleDetail', params: { article_id: deleteData.article_id } }))
        .catch(err => {
          console.error(err)
          router.push({ name: 'ArticleDetail', params: { article_id: deleteData.article_id } })
          alert('본인이 쓴 댓글만 삭제할 수 있습니다.')
        })
    },
    updateComment({ getters, dispatch }, updateData) {
      axios.post(SERVER.URL + SERVER.ROUTES.list + updateData.article_id + '/' + updateData.comment_id + '/u_comment/', { content: updateData.content }, getters.config)
        .then(() => dispatch('fetchComments', updateData.article_id))
        .catch(err => {
          console.error(err)
          alert('본인이 쓴 댓글만 수정할 수 있습니다.')
        })
    },
    //movies
    fetchMovies({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.mlist)
        .then(res => commit('SET_MOVIES', res.data))
        .catch(err => console.error(err))
    },
    searchMovies({ commit }, search) {
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + 'search/', {'search': search}, null)
        .then(res => commit('SET_MOVIES', res.data))
        .catch(err => console.error(err))
    },
    fetchMovie({ commit, dispatch }, movie_id) {
      axios.get(SERVER.URL + SERVER.ROUTES.mlist + movie_id)
        .then(res => {
          commit('SET_MOVIE', res.data)
          dispatch('fetchTrailer', res.data.title)
        })
        .catch(err => console.error(err))
    },
    fetchTrailer({commit}, title) {
      console.log(title)
      axios.get(SERVER.API_URL, {
        params: {
          key: API_KEY,
          part: 'snippet',
          type: 'video',
          q: `${title} trailer`,
          maxResults: 1,
        }
      })
        .then(res => {
           commit('SET_TRAILER', 'https://www.youtube.com/embed/' + res.data.items[0].id.videoId)
        })
        .catch(err => console.error(err))
    },
    fetchLiked({ commit, getters }, movie_id) {
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + movie_id + '/liked/', null, getters.config)
        .then(res => {
          commit('SET_LIKES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchLike({ commit, getters }, movie_id) {
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + movie_id + '/like/', null, getters.config)
        .then(res => {
          commit('SET_LIKES', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    createMovie({ getters }, movieData) {
      axios.post(SERVER.URL + SERVER.ROUTES.mcreate, movieData, getters.config)
        .then((res) => router.push({ name: 'MovieDetail', params: { movie_id: res.data.id } }))
        .catch(err => {
          console.error(err.response.data)
          router.push({ name: 'MovieList' })
          alert('관리자에게 요청하세요!')
        })
    },
    deleteMovie({ getters }, movie_id ) {
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + movie_id + '/delete/', null, getters.config)
        .then(() => {
          router.push({ name: 'MovieList' })
          alert('영화가 삭제되었습니다!')
        })
        .catch(err => {
          alert('관리자에게 요청하세요!')
          console.error(err)})
    },
    updateMovie({ getters }, movieData) {
      axios.put(SERVER.URL + SERVER.ROUTES.mlist + movieData.movie_id + '/update/', movieData, getters.config)
        .then(() => router.push({ name: 'MovieDetail' , params: { movie_id: movieData.movie_id } }))
        .catch(err => console.error(err.response.data))
    },
    // ranks
    fetchRanks({ commit }, movie_id) {
      axios.get(SERVER.URL + SERVER.ROUTES.mlist + movie_id + '/l_rank/')
        .then(res => commit('SET_RANKS', res.data))
        .catch(err => console.error(err))
    },
    createRank({ getters, dispatch }, rankData) {
      console.log(rankData)
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + rankData.movie + '/c_rank/', rankData, getters.config)
        .then(() => {
          dispatch('fetchRanks', rankData.movie)
          dispatch('fetchRanked', rankData.movie)
        })
        .catch(err => {
          router.push({name: 'Login'})
          console.error(err)}
          )
    },
    deleteRank({ getters }, deleteData) {
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + deleteData.movie_id + '/' + deleteData.rank_id + '/d_rank/', null, getters.config)
        .then(() => router.push({ name: 'MovieDetail', params: { movie_id: deleteData.movie_id } }))
        .catch(err => console.error(err))
    },
    updateRank({ getters, dispatch }, updateData) {
      console.log(updateData)
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + updateData.movie_id + '/' + updateData.rank_id + '/u_rank/', { content: updateData.content, score: updateData.score }, getters.config)
        .then(() => dispatch('fetchRanks', updateData.movie_id))
        .catch(err => {
          console.log(updateData.content)
          console.log(updateData.score)
          console.error(err)})
    },
    fetchRanked({ commit, getters }, movie_id) {
      axios.post(SERVER.URL + SERVER.ROUTES.mlist + movie_id + '/ranked/', null, getters.config)
        .then(res => {
          commit('SET_RANKED', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  modules: {
  },
})