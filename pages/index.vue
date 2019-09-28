<template>
  <div>
    <Header />

    <div>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          <div>{{ post.id }}</div>
          <div>{{ post.title }}</div>
          <div>{{ post.contents }}</div>
          <div>{{ post.eyecatch }}</div>
          <div>{{ post.post_date }}</div>
          <div>{{ post.categorys }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  head() {
    return {
      title: ''
    }
  },
  async asyncData({ params }) {
    const { data } = await axios.get(`http://siropaca.net:4000/api/v1/posts`)
    return { posts: data }
  }
}
</script>

<style></style>
