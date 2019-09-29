<template>
  <div>
    <Header />

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
    const { data } = await axios.get('http://siropaca.net:4000/api/v1/posts')
    return { posts: data }
  }
}
</script>

<style></style>
