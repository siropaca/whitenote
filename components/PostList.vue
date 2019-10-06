<template>
  <main>
    <ul class="c-postlist">
      <li v-for="(post, index) in posts" :key="index" class="_item">
        <nuxt-link :to="{ name: 'id', params: { id: post.id } }">
          <img :src="post.url" :alt="post.alt" />
          <div class="_info">
            <h2 class="_title">{{ post.title }}</h2>
            <time class="_date">{{ post.post_date | fmtDate }}</time>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  filters: {
    fmtDate(date) {
      const dateObj = new Date(date.replace(/-/g, '/'))
      return `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`
    }
  },
  props: {
    posts: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
