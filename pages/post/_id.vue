<template>
  <div>
    <PostDetail :post="post" />
  </div>
</template>

<script>
import axios from 'axios'
import PostDetail from '~/components/PostDetail.vue'

export default {
  components: {
    PostDetail
  },
  validate({ params }) {
    if (!/^\d+$/.test(params.id)) {
      throw new Error('Bad Request')
    }
    return true
  },
  head() {
    let desc = this.post.contents
    if (desc) {
      desc = desc
        .replace(/```(.|\s)*?```|`|!?\[.*\)?[)|*}]/g, '')
        .replace(/\s*\r?\n/g, ' ')
        .slice(0, 200)
    }
    return {
      title: this.post.title,
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'artice' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.BASE_URL}/post/${this.post.id}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.post.title} - ${process.env.SITE_NAME}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.url
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description || desc
        },
        {
          hid: 'description',
          name: 'description',
          content: this.post.description || desc
        }
      ]
    }
  },
  asyncData({ params, error }) {
    return axios
      .get(`${process.env.BASE_API_URL}/posts/${params.id}`, {
        headers: { 'x-api-key': process.env.API_KEY }
      })
      .then((res) => {
        return { post: res.data }
      })
      .catch((e) => {
        const res = e.response
        error({ statusCode: res.status, message: res.statusText })
      })
  }
}
</script>
