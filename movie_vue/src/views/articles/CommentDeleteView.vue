<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentDeleteView',
  data() {
    return {
      article_id: this.$route.params.article_id,
      comment_id: this.$route.params.comment_id,
    }
  },
  methods: {
    ...mapActions([
      'deleteComment', 
    ])
  },
  created() {
    const deleteData = {
      article_id: this.article_id,
      comment_id: this.comment_id,
    }
    this.deleteComment(deleteData)
  }
}
</script>

<style>

</style>