<template>
  <div>
    <PostEntry :post="post" />
  </div>
</template>

<script>
import axios from 'axios'
import PostEntry from '~/components/PostEntry.vue'

export default {
  components: {
    PostEntry
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
