<template>
  <div v-show="showMenu" class="c-fixmenu">
    <div class="o-inner -s">
      <!-- home -->
      <div class="_contents">
        <nuxt-link
          :to="{ name: 'index' }"
          class="_item"
          @mousedown="onMousedown"
          @mouseup="onMouseup"
        >
          <i class="fas fa-home"></i>
        </nuxt-link>

        <!-- darkmode -->
        <span id="js-darkbtn" class="_item" @click="changeMode">
          <i class="fas fa-moon"></i>
        </span>

        <!-- outline -->
        <span class="_item">
          <i class="fas fa-stream"></i>
        </span>

        <!-- pagetop -->
        <span
          class="_item"
          @click="toPagetop"
          @mousedown="onMousedown"
          @mouseup="onMouseup"
        >
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
      showMenu: true,
      threshold: 10
    }
  },
  watch: {
    position(newPosi, oldPosi) {
      if (Math.abs(newPosi - oldPosi) < this.threshold) return

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
    onMousedown(e) {
      e.currentTarget.classList.add('-active')
    },
    onMouseup(e) {
      const target = e.currentTarget
      setTimeout(() => {
        target.classList.remove('-active')
      }, 250)
    },
    onScroll() {
      this.position = window.scrollY
    },
    changeMode() {
      const body = document.body
      const darkBtn = document.getElementById('js-darkbtn')

      if (document.getElementById('dark')) {
        body.removeAttribute('id', 'dark')
        darkBtn.classList.remove('-active')
      } else {
        body.setAttribute('id', 'dark')
        darkBtn.classList.add('-active')
      }
    }
  }
}
</script>
