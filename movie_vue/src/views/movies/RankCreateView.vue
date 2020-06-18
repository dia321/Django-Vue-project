<template>
  <div>
    <br>
    <h4 class="text-left">평점작성</h4>
    <br>
    <div class="container">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon">평점</span>
        </div>
        <select v-model="rankData.score" class="form-control bg-dark text-white">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        <div class="input-group-prepend">
          <span class="input-group-text bg-secondary text-light" id="basic-addon2">내용</span>
        </div>
        <input v-model="rankData.content" type="text" class="form-control bg-dark text-light" placeholder="Content" aria-label="Password" aria-describedby="basic-addon2">
      </div>
      <button class="btn btn-primary btn-sm" @click="createRank3">작성하기</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RankCreateView',
  data() {
    return {
      rankData: {
        score: 0,
        content: '',
        movie: this.$route.params.movie_id,
      },
    }
  },
  methods: {
    ...mapActions([
      'createRank',
      'fetchRanks',
      'fetchRanked',
    ]),
    createRank2() {
      console.log(this.rankData.content)
      console.log(this.rankData)
      this.createRank({content:this.rankData.content, score: this.rankData.score, movie: this.rankData.movie})
      this.rankData.score = 0
      this.rankData.content = ''
    },
    createRank3() {
      this.createRank2()
      this.fetchRanked(this.rankData.movie)
    },
  },
}
</script>

<style>
</style>