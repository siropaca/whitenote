<template>
  <ul class="c-post-list">
    <li v-for="(post, index) in posts" :key="index" class="post-item">
      <nuxt-link :to="{ name: 'id', params: { id: post.id } }">
        <img :src="post.url" :alt="post.alt" />
        <div class="post-info">
          <h2 class="title">{{ post.title }}</h2>
          <time class="date">{{ post.post_date | fmtDate }}</time>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  filters: {
    fmtDate(date) {
      const today = new Date(date)
      return `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
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
