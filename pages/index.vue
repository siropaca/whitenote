<template>
  <div class="o-container">
    <div class="o-inner -m">
      <main>
        <PostList :posts="posts" />
      </main>
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
      title: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  },
  asyncData({ params, error }) {
    const GET_POSTS_API_URL = process.env.GET_POSTS_API_URL
    const API_KEY = process.env.API_KEY
    return axios
      .get(`${GET_POSTS_API_URL}?apikey=${API_KEY}`)
      .then((res) => {
        return { posts: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  }
}
</script>
