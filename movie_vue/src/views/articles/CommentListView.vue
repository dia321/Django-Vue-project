<template>
  <div>
    <h4 class="text-left">댓글</h4>
      <div class="container">
        <span v-for="comment in comments" :key="comment.id">
          <div class="input-group mt-3">
            <div class="input-group-prepend">
              <span class="input-group-text">작성자</span>
            </div>
            <!-- <input type="text" disabled :value="comment.user.username" class="form-control" aria-label="Amount (to the nearest dollar)"> -->
            <router-link class="text-left text-decoration-none text-dark bg-light form-control" :to="{ name: 'Profile', params: { username: comment.user.username } }">{{comment.user.username}}</router-link>
            <div class="input-group-append">
              <span class="input-group-text"> 작성 {{ comment.created_at }}</span>
              <span class="input-group-text"> 수정 {{ comment.updated_at }}</span>
            </div>
          </div>
          <div class="input-group mb-0">
            <div class="input-group-prepend">
              <span class="input-group-text">내용</span>
            </div>
            <input type="text" disabled :value="comment.content" class="form-control bg-light" aria-label="Amount (to the nearest dollar)">
            <!-- <input type="text" :ref="`${comment.id}`" :value="comment.content" class="form-control" aria-label="Amount (to the nearest dollar)"> -->
            <button class="btn btn-warning btn-sm" @click="updateComment3(comment.id, comment.content, comment.user.username)">수정하기</button>
            <!-- <button class="btn btn-warning" @click="updateComment({article_id: article_id, comment_id: comment.id, content: comment.content })">수정하기</button> -->
            <!-- <button class="btn btn-warning" @click="updateComment({article_id: article_id, comment_id: comment.id, content: $refs[`${comment.id}`][0]._value })">수정하기</button> -->
            <button class="btn btn-danger btn-sm" @click="deleteComment2(comment.id, comment.user.username)">삭제하기</button>
          </div>
          <div class="input-group mb-0 update" :id="comment.id" style="display: none;">
            <input type="text" v-model="updatedComment" class="form-control" aria-label="Amount (to the nearest dollar)">
            <div class="input-group-append">
              <button class="btn btn-warning btn-sm" @click="updateComment2({article_id: article_id, comment_id: comment.id, content: updatedComment })">수정하기</button>
            </div>
          </div>
          
        </span>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CommentListView',
  data() {
    return {
      article_id: this.$route.params.article_id,
      updatedComment: '',
    }
  },
  computed: {
    ...mapState([
      'comments',
      'currentUsername',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchComments', 'updateComment',
    ]),
    updateComment2(updateData) {
      this.updateComment(updateData)
      document.getElementById(`${updateData.comment_id}`).style="display: none;"
      this.updatedComment = ''
    },
    updateComment3(comment_id, comment_content, comment_username) {
      const update = document.getElementsByClassName('update')
      update.forEach((item) => item.style="display: none;")
      if (comment_username==this.currentUsername) {
        this.updatedComment = comment_content
        document.getElementById(`${comment_id}`).style="display: show;"
      }
      else {
        alert('본인이 쓴 댓글만 수정 할 수 있습니다.')
      }
    },
    deleteComment2(comment_id, comment_username) {
      if (comment_username == this.currentUsername) {
        this.$router.push({name: 'DeleteComment', params: {article_id: this.article_id, comment_id: comment_id }})
      }
      else {
        alert('본인이 쓴 댓글만 삭제 할 수 있습니다.')
      }
    },
  },
  created() {
    this.fetchComments(this.article_id)
  },
}
</script>

<style>

</style>