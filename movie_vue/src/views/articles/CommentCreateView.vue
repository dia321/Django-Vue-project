<template>
  <div>
    <br>
    <h4 class="text-left">댓글작성</h4>
    <br>
    <div class="container">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">내용</span>
        </div>
        <textarea v-model="commentData.content" type="text" cols="30" rows="1" class="form-control bg-dark text-light" placeholder="Content" aria-label="Password" aria-describedby="basic-addon2"></textarea>
      </div>
      <button class="btn btn-primary btn-sm" @click="createComment2">작성하기</button>
      <!-- <button class="btn btn-primary" @click="createComment(commentData)">작성하기</button> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentCreateView',
  data() {
    return {
      commentData: {
        content: '',
        article: this.$route.params.article_id,
      },
    }
  },
  methods: {
    ...mapActions([
      'createComment',
      'fetchComments',
    ]),
    createComment2() {
      console.log(this.commentData.content)
      console.log(this.commentData)
      this.createComment({content:this.commentData.content, article: this.commentData.article})
      this.commentData.content = ''
    },
  },
}
</script>

<style>
</style>