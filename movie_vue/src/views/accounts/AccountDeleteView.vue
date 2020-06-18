<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AccountDeleteView',
    data() {
        return {
            user_id: this.$route.params.user_id,
    }
    },
    methods: {
        ...mapActions(['deleteAccount'])
    },
    created() {
        this.deleteAccount(this.user_id)
  }
}
</script>

<style>

</style>