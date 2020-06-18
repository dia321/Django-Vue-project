<template>
  <div>
    <h4><i class="fas fa-user-plus"></i> 회원가입</h4>
    <br>
    <br>
    <div class="container w-50">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon1">아이디</span>
        </div>
        <input v-model="signupData.username" type="text" class="form-control bg-dark text-light" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">비밀번호</span>
        </div>
        <input v-model="signupData.password1" type="password" class="form-control bg-dark text-light" placeholder="Password 8자리 이상" aria-label="Password" aria-describedby="basic-addon2">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon3">비밀번호 확인</span>
        </div>
        <input v-model="signupData.password2" type="password" class="form-control bg-dark text-light" placeholder="Password Confirm 문자, 숫자, 특수문자를 같이 사용" aria-label="Password" aria-describedby="basic-addon3">
      </div>
      <button class="btn btn-primary" @click="signup(signupData)">회원가입</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignupView',
  data() {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null,
      },
    }
  },
  methods: {
    ...mapActions([
      'signup', 
    ])
  }
}
</script>

<style>

</style>