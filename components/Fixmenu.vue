<template>
  <div v-show="showMenu" class="c-fixmenu">
    <div class="o-inner -s">
      <div class="_contents">
        <nuxt-link :to="{ name: '/' }" class="_item">
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
    </div>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'

export default {
  data() {
    return {
      position: 0,
      showMenu: true
    }
  },
  watch: {
    position(newPosi, oldPosi) {
      this.showMenu = newPosi < oldPosi || false
    }
  },
  mounted() {
    smoothscroll.polyfill()

    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    toPagetop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onScroll() {
      this.position = window.scrollY
    }
  }
}
</script>
