<template>
  <main class="c-postentry">
    <div class="_postheader">
      <img :src="post.url" :alt="post.alt" />
      <div class="_filter"></div>

      <div class="_postinfo">
        <div class="o-inner -m">
          <h1 class="_title">{{ post.title }}</h1>
          <time class="_date">{{ post.post_date | fmtDate }}</time>
          <div class="_categorys">
            <a
              v-for="(category, index) in makeCatAry(post.categorys)"
              :key="index"
              class="_catitem"
              href="#"
            >
              {{ category }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="o-container">
      <div class="o-inner -s">
        <div class="_postbody">
          <div v-html="$md.render(post.contents)"></div>
        </div>
      </div>
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
    makeCatAry: (categorys) => {
      return categorys ? categorys.split(',') : []
    }
  }
}
</script>
