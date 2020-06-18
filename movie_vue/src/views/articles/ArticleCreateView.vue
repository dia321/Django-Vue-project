<template>
  <div>
    <h4><i class="fas fa-pencil-alt"></i> 글쓰기</h4>
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
      <button class="btn btn-primary btn-sm" @click="createArticle(articleData)">작성하기</button>
      <router-link class="btn btn-danger btn-sm" :to="{ name: 'ArticleList' }">취소</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ArticleCreateView',
  data() {
    return {
      articleData: {
        title: null,
        content: null,
      },
    }
  },
  methods: {
    ...mapActions([
      'createArticle',
    ])
  }
}
</script>

<style>
</style>