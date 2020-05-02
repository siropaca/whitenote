<template>
  <div class="o-container">
    <div class="o-inner -m">
      <div class="o-padding">
        <main>
          <PostList :posts="posts" :list-title="recentPosts" />
        </main>
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
      titleTemplate: null,
      title: process.env.SITE_NAME,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${process.env.AUTHOR}の技術ブログです。`
        }
      ]
    }
  },
  data() {
    return {
      recentPosts: 'Recent Posts'
    }
  },
  asyncData({ params, error }) {
    return axios
      .get(`${process.env.BASE_API_URL}/posts`, {
        headers: { 'x-api-key': process.env.API_KEY }
      })
      .then((res) => {
        return { posts: res.data }
      })
      .catch((e) => {
        const res = e.response
        error({ statusCode: res.status, message: res.statusText })
      })
  }
}
</script>
