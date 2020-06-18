<template>
  <div>
    <h4 class="text-left">평점</h4>
      <div class="container">
        <span v-for="rank in ranks" :key="rank.id">
          <div class="input-group mt-3">
            <div class="input-group-prepend">
              <span class="input-group-text">작성자</span>
            </div>
            <!-- <input type="text" disabled :value="rank.user.username" class="form-control" aria-label="Amount (to the nearest dollar)"> -->
            <router-link class="text-left text-decoration-none text-dark bg-light form-control" :to="{ name: 'Profile', params: { username: rank.user.username } }">{{rank.user.username}}</router-link>
            <div class="input-group-append">
              <span class="input-group-text"> 작성 {{ rank.created_at }}</span>
              <span class="input-group-text"> 수정 {{ rank.updated_at }}</span>
            </div>
          </div>
          <div class="input-group mb-0">
            <div class="input-group-prepend">
              <span class="input-group-text">평점</span>
              <span class="input-group-text bg-light">{{ rank.score }}</span>
              <span class="input-group-text">내용</span>
            </div>
            <input type="text" disabled :value="rank.content" class="form-control bg-light" aria-label="Amount (to the nearest dollar)">
            <button class="btn btn-warning btn-sm" @click="updateRank3(rank.id, rank.score, rank.content, rank.user.username)">수정하기</button>
            <button class="btn btn-danger btn-sm" @click="deleteRank2(rank.id, rank.user.username)">삭제하기</button>
          </div>
          <div class="input-group mb-0 update" :id="rank.id" style="display: none;">
              <select v-model="updatedScore" class="form-control">
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
            <!-- <input type="text" v-model="updatedScore" class="form-control" aria-label="Amount (to the nearest dollar)"> -->
            <input type="text" v-model="updatedRank" class="form-control" aria-label="Amount (to the nearest dollar)">
            <div class="input-group-append">
              <button class="btn btn-warning btn-sm" @click="updateRank2({movie_id: movie_id, rank_id: rank.id, score: updatedScore, content: updatedRank })">수정하기</button>
            </div>
          </div>
          
        </span>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RankListView',
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      updatedRank: '',
      updatedScore: 0,
    }
  },
  computed: {
    ...mapState([
      'ranks',
      'currentUsername',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchRanks', 'updateRank', 'fetchRanked',
    ]),
    updateRank2(updateData) {
      this.updateRank(updateData)
      document.getElementById(`${updateData.rank_id}`).style="display: none;"
      this.updatedRank = ''
      this.updatedScore = 0
      this.fetchRanked(this.movie_id)
    },
    updateRank3(rank_id, rank_score, rank_content, rank_username) {
      const update = document.getElementsByClassName('update')
      update.forEach((item) => item.style="display: none;")
      if (rank_username==this.currentUsername) {
        this.updatedScore = rank_score
        this.updatedRank = rank_content
        document.getElementById(`${rank_id}`).style="display: show;"
      }
      else {
        alert('본인이 쓴 평점만 수정 할 수 있습니다.')
      }
    },
    deleteRank2(rank_id, rank_username) {
      if (rank_username == this.currentUsername) {
        this.$router.push({name: 'DeleteRank', params: {movie_id: this.movie_id, rank_id: rank_id }})
      }
      else {
        alert('본인이 쓴 평점만 삭제 할 수 있습니다.')
      }
    },
  },
  created() {
    this.fetchRanks(this.movie_id)
  },
}
</script>

<style>

</style>