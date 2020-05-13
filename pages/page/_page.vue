<template>
  <div class="o-container">
    <div class="o-inner -m">
      <div class="o-padding">
        <main>
          <PostList :posts="posts" :list-title="listTitle" />
        </main>

        <Pagenation :prev-page="prevPage" :next-page="nextPage" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PostList from '~/components/PostList.vue'
import Pagenation from '~/components/Pagenation.vue'

export default {
  components: {
    PostList,
    Pagenation
  },
  validate({ params }) {
    if (!/^\d+$/.test(params.page)) {
      throw new Error('Bad Request')
    }
    return true
  },
  head() {
    return {
      titleTemplate: null,
      title: process.env.SITE_NAME,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${process.env.AUTHOR}の技術ブログです。`
        }
      ]
    }
  },
  data() {
    return {
      listTitle: 'Recent Posts'
    }
  },
  asyncData({ params, error }) {
    return axios
      .get(`${process.env.BASE_API_URL}/posts?page=${params.page}`, {
        headers: { 'x-api-key': process.env.API_KEY }
      })
      .then((res) => {
        const data = res.data
        return {
          posts: data.posts,
          prevPage: data.prevPage,
          nextPage: data.nextPage
        }
      })
      .catch((e) => {
        const res = e.response
        error({ statusCode: res.status, message: res.statusText })
      })
  }
}
</script>
