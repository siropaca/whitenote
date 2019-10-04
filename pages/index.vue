<template>
  <div>
    <Header />

    <nuxt-link :to="{ name: 'categorys' }">かてごりーページ</nuxt-link>

    <PostList :posts="posts" />
  </div>
</template>

<script>
import axios from 'axios'
import Header from '~/components/Header.vue'
import PostList from '~/components/PostList.vue'

export default {
  components: {
    Header,
    PostList
  },
  head() {
    return {
      title: ''
    }
  },
  async asyncData({ params }) {
    const { data } = await axios.get('https://siropaca.net/api/v1/posts')
    return { posts: data }
  }
}
</script>

<style></style>
