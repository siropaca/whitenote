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
    return {
      title: `${this.post.title} - `
    }
  },
  asyncData({ params, error }) {
    return axios
      .get(`https://siropaca.net/api/v1/posts?id=${params.id}`)
      .then((res) => {
        return { post: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  }
}
</script>
