<template>
  <main class="c-postentry">
    <div class="_info">
      <h1 class="_title">{{ post.title }}</h1>
      <time class="_date">{{ post.post_date | fmtDate }}</time>
      <div v-html="makeCatTag(post.categorys)"></div>
    </div>

    <div class="_eyecatch">
      <img :src="post.url" :alt="post.alt" />
    </div>

    <div class="_body">
      <div v-html="$md.render(post.contents)"></div>
    </div>
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
  },
  methods: {
    makeCatTag: (categorys) => {
      return categorys
        .split(',')
        .map((item) => `<span>${item}</span>`)
        .join('')
    }
  }
}
</script>
