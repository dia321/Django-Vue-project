<template>
  <div class="container">
    <h4 class="text-center">{{ article.title }}</h4>
    <div class="input-group mt-3">
      <div class="input-group-prepend">
        <span class="input-group-text">작성자</span>
      </div>
      <router-link class="text-left text-decoration-none text-dark bg-light form-control" :to="{ name: 'Profile', params: { username: article.user.username } }">{{article.user.username}}</router-link>
      <div class="input-group-append">
        <span class="input-group-text"> 작성 {{ article.created_at }}</span>
        <span class="input-group-text"> 수정 {{ article.updated_at }}</span>
      </div>
      <textarea class="text-left bg-light p-2" style="width: 100%;" rows="5" disabled :value="article.content"></textarea>
    </div>
    <!-- <br>
    <p class="text-left">{{ article.content }}</p> -->
    <br>
    <router-link class="btn btn-primary btn-sm" :to="{ name: 'ArticleList' }">목록으로</router-link>
    <button class="btn btn-warning btn-sm" @click="updateArticle2">수정하기</button>
    <button class="btn btn-danger btn-sm" @click="deleteArticle2">삭제하기</button>
    <hr>
    <CommentListView />
    <CommentCreateView />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CommentCreateView from './CommentCreateView.vue'
import CommentListView from './CommentListView.vue'

export default {
  name: 'ArticleDetailView',
  components: {
    CommentListView,
    CommentCreateView,
  },
  data() {
    return {
      article_id: this.$route.params.article_id,
    }
  },
  computed: {
    ...mapState([
      'article',
      'currentUsername',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchArticle',
    ]),
    updateArticle2() {
      if (this.article.user.username==this.currentUsername) {
        this.$router.push({ name: 'ArticleUpdate', params: { article_id: this.article_id }})
      }
      else {
        alert('본인이 쓴 글만 수정 할 수 있습니다.')
      }
    },
    deleteArticle2() {
      if (this.article.user.username==this.currentUsername) {
        this.$router.push({ name: 'ArticleDelete', params: { article_id: this.article_id }})
      }
      else {
        alert('본인이 쓴 글만 삭제 할 수 있습니다.')
      }
    },
    
  },
  created() {
    this.fetchArticle(this.article_id)
  },
}
</script>

<style>

</style>