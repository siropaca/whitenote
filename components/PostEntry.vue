<template>
  <main class="c-postentry">
    <div class="_postheader">
      <img :src="post.url" :alt="post.alt" />
      <div class="_filter"></div>

      <div class="_postinfo">
        <div class="o-inner -m">
          <h1 class="_title">{{ post.title }}</h1>
          <time class="_date">{{ post.post_date | fmtDate }}</time>
          <div v-if="post.categorys" class="_categorys">
            <a
              v-for="(category, index) in makeCatAry(post.categorys)"
              :key="index"
              class="_catitem"
              href="#"
            >
              <i class="fas fa-tag"></i>
              {{ category }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="o-container">
      <div class="o-inner -s">
        <div
          class="_postbody js-postbody"
          v-html="$md.render(post.contents)"
        ></div>
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
  mounted() {
    const self = this
    self.getATag().forEach((el) => {
      el.addEventListener('click', self.openNewWin)
    })
  },
  destroyed() {
    const self = this
    self.getATag().forEach((el) => {
      el.removeEventListener('click', self.openNewWin)
    })
  },
  methods: {
    makeCatAry(categorys) {
      return categorys ? categorys.split(',') : []
    },
    getATag() {
      return document
        .getElementsByClassName('js-postbody')[0]
        .querySelectorAll('a')
    },
    openNewWin(e) {
      e.preventDefault()
      const url = e.target.getAttribute('href')
      window.open(url)
    }
  }
}
</script>
