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
      throw new Error('正しいURLを入力してください')
    }
    return true
  },
  head() {
    let desc = this.post.contents
    if (desc) {
      desc = desc.replace(/(```(.|\s)*?```|`|\r?\n)/g, '').slice(0, 300)
    }
    return {
      title: `${this.post.title} - `,
      meta: [
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
      .get(`https://s10i.me/api/v1/posts/${params.id}`, {
        headers: { 'x-api-key': process.env.API_KEY }
      })
      .then((res) => {
        return { post: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  }
}
</script>
