<template>
  <div>
    <PostDetail :post="post" />

    <Fixmenu />
  </div>
</template>

<script>
import axios from 'axios'
import PostDetail from '~/components/PostDetail.vue'
import Fixmenu from '~/components/Fixmenu.vue'

export default {
  components: {
    PostDetail,
    Fixmenu
  },
  validate({ params }) {
    if (!/^\d+$/.test(params.id)) {
      throw new Error('正しいURLを入力してください')
    }
    return true
  },
  head() {
    const md = require('markdown-it')()
    const desc = md
      .render(this.post.contents)
      .replace(
        /(<pre>(.|\s)*?<\/pre>|<(.|\s)*?>|&lt;(.|\s)*?&gt;|&amp;lt;.*?&amp;gt;|\{.*?\}|\r?\n)/g,
        ''
      )
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
      .get(`${process.env.GET_POSTS_API_URL}/${params.id}`)
      .then((res) => {
        return { post: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  }
}
</script>
