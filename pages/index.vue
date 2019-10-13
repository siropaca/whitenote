<template>
  <div>
    <!-- <nuxt-link :to="{ name: 'categorys' }">かてごりーページ</nuxt-link> -->

    <div class="o-container">
      <div class="o-inner -m">
        <PostList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PostList from '~/components/PostList.vue'

export default {
  components: {
    PostList
  },
  head() {
    return {
      title: ''
    }
  },
  asyncData({ params, error }) {
    return axios
      .get('https://siropaca.net/api/v1/posts')
      .then((res) => {
        return { posts: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  }
}
</script>
