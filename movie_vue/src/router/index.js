import Vue from 'vue'
import VueRouter from 'vue-router'

// about 
import About from '../views/About.vue'
// accounts
import SignupView from '../views/accounts/SignupView.vue'
import LoginView from '../views/accounts/LoginView.vue'
import LogoutView from '../views/accounts/LogoutView.vue'
import ProfileView from '../views/accounts/ProfileView.vue'
import UserconfigView from '../views/accounts/UserconfigView.vue'
import AccountDeleteView from '../views/accounts/AccountDeleteView.vue'
// articles
import ArticleListView from '../views/articles/ArticleListView.vue'
import ArticleCreateView from '../views/articles/ArticleCreateView.vue'
import ArticleDetailView from '../views/articles/ArticleDetailView.vue'
import ArticleDeleteView from '../views/articles/ArticleDeleteView.vue'
import ArticleUpdateView from '../views/articles/ArticleUpdateView.vue'
// articles_comment
import CommentDeleteView from '../views/articles/CommentDeleteView.vue'
// movies
import MovieListView from '../views/movies/MovieListView.vue'
import MovieCreateView from '../views/movies/MovieCreateView.vue'
import MovieDetailView from '../views/movies/MovieDetailView.vue'
import MovieDeleteView from '../views/movies/MovieDeleteView.vue'
import MovieUpdateView from '../views/movies/MovieUpdateView.vue'
// movies_rank
import RankDeleteView from '../views/movies/RankDeleteView.vue'
// movie_reccomend
import MovieRecommendView from '../views/movies/MovieRecommendView.vue'



Vue.use(VueRouter)

  const routes = [
  // about
  {
    path: '/',
    name: 'About',
    component: About
  },
  // accounts
  {
    path: '/accounts/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/accounts/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/accounts/profile/:username',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/accounts/config',
    name: 'Config',
    component: UserconfigView
  },
  {
    path: '/accounts/delete/:user_id',
    name: 'AccountDelete',
    component: AccountDeleteView
  },
  // articles
  {
    path: '/articles/',
    name: 'ArticleList',
    component: ArticleListView
  },
  {
    path: '/articles/create',
    name: 'ArticleCreate',
    component: ArticleCreateView
  },
  {
    path: '/articles/:article_id',
    name: 'ArticleDetail',
    component: ArticleDetailView
  },
  {
    path: '/articles/:article_id/delete',
    name: 'ArticleDelete',
    component: ArticleDeleteView
  },
  {
    path: '/articles/:article_id/update',
    name: 'ArticleUpdate',
    component: ArticleUpdateView
  },
  {
    path: '/articles/:article_id/:comment_id/d_comment',
    name: 'DeleteComment',
    component: CommentDeleteView
  },
  // movies
  {
    path: '/movies/',
    name: 'MovieList',
    component: MovieListView
  },
  {
    path: '/movies/create',
    name: 'MovieCreate',
    component: MovieCreateView
  },
  {
    path: '/movies/:movie_id',
    name: 'MovieDetail',
    component: MovieDetailView
  },
  {
    path: '/movies/:movie_id/delete',
    name: 'MovieDelete',
    component: MovieDeleteView
  },
  {
    path: '/movies/:movie_id/update',
    name: 'MovieUpdate',
    component: MovieUpdateView
  },
  {
    path: '/movies/:movie_id/:rank_id/d_rank',
    name: 'DeleteRank',
    component: RankDeleteView
  },
  {
    path: '/recommend/',
    name: 'Recommend',
    component: MovieRecommendView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 로그인 필수 : 'Logout', 'Create' 등등
  const publicPages = ['About', 'Login', 'Signup', 'ArticleList', 'ArticleDetail', 'MovieList', 'MovieDetail', 'Profile', ]
  const authPages = ['Login', 'Signup']
  
  const authRequired = !publicPages.includes(to.name)  
  const unauthRequired = authPages.includes(to.name) 
  const isLoggedIn = !!Vue.$cookies.isKey('auth-token')
  if(unauthRequired && isLoggedIn) {
    next({ name: 'About' })
  }
  authRequired && !isLoggedIn ? next({ name: 'Login'}) : next()
})

export default router
