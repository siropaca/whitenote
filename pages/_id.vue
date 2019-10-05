<template>
  <div>
    <Header />

    <div>{{ post }}</div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: `${this.post.title} - `
    }
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://siropaca.net/api/v1/posts?id=${params.id}`
    )
    return { post: data }
  }
}
</script>
