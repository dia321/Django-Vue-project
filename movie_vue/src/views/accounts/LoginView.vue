<template>
  <div>
    <h4><i class="fas fa-user-check"></i> 로그인</h4>
    <br>
    <br>
    <div class="container w-50">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon1">아이디</span>
        </div>
        <input v-model="loginData.username" type="text" class="form-control bg-dark text-light" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">비밀번호</span>
        </div>
        <input v-model="loginData.password" type="password" class="form-control bg-dark text-light" placeholder="Password" aria-label="Password" aria-describedby="basic-addon2">
      </div>
      <button class="btn btn-primary" @click="login(loginData)">로그인</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      loginData: {
        username: null,
        password: null,
      },
    }
  },
  methods: {
    ...mapActions([
      'login',
    ])
  }
}
</script>

<style>

</style>