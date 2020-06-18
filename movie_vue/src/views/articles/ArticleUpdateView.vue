<template>
  <div>
    <h1>수정하기</h1>
    <div class="container">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon1">제목</span>
        </div>
        <input v-model="articleData.title" type="text" class="form-control bg-dark text-light" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">내용</span>
        </div>
        <textarea v-model="articleData.content" type="text" cols="30" rows="5" class="form-control bg-dark text-light" placeholder="Content" aria-label="Password" aria-describedby="basic-addon2"></textarea>
      </div>
      <router-link class="btn btn-primary btn-sm" :to="{ name: 'ArticleDetail', params: { article_id: article.id } }">돌아가기</router-link> 
      <button class="btn btn-warning btn-sm" @click="updateArticle(articleData)">수정하기</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ArticleUpdateView',
  data() {
    return {
      articleData: {
        title: null,
        content: null,
        article_id: this.$route.params.article_id
      },
    }
  },
  computed: {
    ...mapState([
      'article',
    ])
  },
  methods: {
    ...mapActions([
      'updateArticle',
      'fetchArticle',
    ])
  },
  created() {
    this.fetchArticle(this.articleData.article_id)
    this.articleData.title = this.article.title
    this.articleData.content = this.article.content
    console.log(this.articleData)
  },
}
</script>

<style>
</style>