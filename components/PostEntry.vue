<template>
  <main class="c-postentry">
    <h1 class="_title">{{ post.title }}</h1>
    <time class="_date">{{ post.post_date | fmtDate }}</time>
    <div>{{ post.categorys }}</div>
    <div class="_eyecatch">
      <img :src="post.url" :alt="post.alt" />
    </div>
    <div>{{ post.contents }}</div>
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
    post: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
