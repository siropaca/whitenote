<template>
  <div class="c-fixmenu">
    <nuxt-link to="/" class="_item">
      <i class="fas fa-home"></i>
    </nuxt-link>
    <span class="_item">
      <i class="fas fa-lightbulb"></i>
    </span>
    <span class="_item">
      <i class="fas fa-stream"></i>
    </span>
    <span class="_item" @click="toPagetop">
      <i class="fas fa-level-up-alt"></i>
    </span>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'

export default {
  mounted() {
    smoothscroll.polyfill()
  },
  methods: {
    toPagetop: () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
