<template>
  <div>
    <h4><i class="fas fa-book-open"></i> 게시판</h4>
      <br>
      <br>
      <div class="container">
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles.slice().reverse()" :key="`a_${article.id}`">
              <th scope="row">{{ articles.length - index }}</th>
              <td><router-link class="text-decoration-none text-dark" :to="{ name: 'ArticleDetail', params: { article_id: article.id } }">{{ article.title }}</router-link></td>                  
              <td><router-link class="text-decoration-none text-dark" :to="{ name: 'Profile', params: { username: article.user.username } }">{{ article.user.username }}</router-link></td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end">
          <router-link class="btn btn-primary btn-sm" :to="{ name: 'ArticleCreate' }">글쓰기</router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ArticleListView',
  computed: {
    ...mapState([
      'articles',
    ])
  },
  methods: {
    ...mapActions([
      'fetch', 
    ])
  },
  created() {
    this.fetch()
  }
}
</script>

<style>

</style>