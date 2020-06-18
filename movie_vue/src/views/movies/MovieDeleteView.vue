<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MovieDeleteView',
  data() {
    return {
      movie_id: this.$route.params.movie_id,
    }
  },
  methods: {
    ...mapActions([
      'deleteMovie', 
    ])
  },
  created() {
    this.deleteMovie(this.movie_id)
  }
}
</script>

<style>

</style>