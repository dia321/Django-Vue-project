<template>
  <div>
    <h4><i class="fas fa-user-cog" style="cursor:pointer;"></i> 유저 관리</h4>
    <br>
    <br>
    <div class="container">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">유저</th>
              <th scope="col">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users.slice().reverse()" :key="`a${user.id}`">
              <th scope="row">{{ users.length - index }}</th>
              <td><router-link class="text-decoration-none text-dark" :to="{ name: 'Profile', params: { username: user.username } }"> {{ user.username }} </router-link></td>                  
              <td class="p-0 align-middle"><button class="btn btn-danger btn-sm" @click="deleteAccount2(user)">내쫓기</button></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserconfigView',
  computed: {
    ...mapState([
      'users',
    ])
  },
  methods: {
    ...mapActions([
      'fetchUsers', 
    ]),
    deleteAccount2(user) {
      this.$router.push({name: 'AccountDelete', params: { user_id: user.id }})
      this.fetchUsers()
    },
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style>

</style>