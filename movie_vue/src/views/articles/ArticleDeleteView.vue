<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ArticleDeleteView',
  data() {
    return {
      article_id: this.$route.params.article_id,
    }
  },
  methods: {
    ...mapActions([
      'deleteArticle', 
    ])
  },
  created() {
    this.deleteArticle(this.article_id)
  }
}
</script>

<style>

</style>