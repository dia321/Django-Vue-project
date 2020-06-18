<template>
  <div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RankDeleteView',
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      rank_id: this.$route.params.rank_id,
    }
  },
  methods: {
    ...mapActions([
      'deleteRank', 
    ])
  },
  created() {
    const deleteData = {
      movie_id: this.movie_id,
      rank_id: this.rank_id,
    }
    this.deleteRank(deleteData)
  }
}
</script>

<style>

</style>