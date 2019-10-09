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
  async asyncData({ params }) {
    const { data } = await axios.get('https://siropaca.net/api/v1/posts')
    return { posts: data }
  }
}
</script>
