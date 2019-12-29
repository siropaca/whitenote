<template>
  <div v-show="showMenu" class="c-fixmenu">
    <div class="o-inner -s">
      <!-- home -->
      <div class="_contents">
        <nuxt-link :to="{ name: 'index' }" class="_item" @touchend="onTouchend">
          <i class="fas fa-home"></i>
        </nuxt-link>

        <!-- darkmode -->
        <span
          id="js-darkbtn"
          class="_item"
          tabindex="0"
          @mouseup="onMouseup"
          @touchstart="onTouchstart"
          @touchend="onTouchend"
          @click="changeTheme"
        >
          <i class="fas fa-moon"></i>
        </span>

        <!-- outline -->
        <span
          class="_item"
          tabindex="0"
          @mouseup="onMouseup"
          @touchstart="onTouchstart"
          @touchend="onTouchend"
        >
          <i class="fas fa-stream"></i>
        </span>

        <!-- pagetop -->
        <span
          class="_item"
          tabindex="0"
          @mouseup="onMouseup"
          @touchstart="onTouchstart"
          @touchend="onTouchend"
          @click="toPagetop"
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

    this.changeDarkBtn()
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onTouchstart(e) {
      e.currentTarget.focus()
    },
    onMouseup(e) {
      e.currentTarget.blur()
    },
    onTouchend(e) {
      e.currentTarget.blur()
    },
    toPagetop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onScroll() {
      this.position = window.scrollY
    },
    changeTheme() {
      const body = document.body
      const isDark = body.classList.contains('dark-theme')

      this.changeDarkBtn()

      if (isDark) {
        body.classList.add('light-theme')
        body.classList.remove('dark-theme')
      } else {
        body.classList.add('dark-theme')
        body.classList.remove('light-theme')
      }
    },
    changeDarkBtn() {
      const darkBtn = document.getElementById('js-darkbtn')
      const isDark = document.body.classList.contains('dark-theme')

      if (isDark) {
        darkBtn.classList.remove('-active')
      } else {
        darkBtn.classList.add('-active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-fixmenu {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  animation: show 0.3s;

  a {
    &:hover {
      color: inherit !important;
    }
  }

  ._contents {
    display: flex;
    justify-content: space-around;
    border-radius: 20px;
    overflow: hidden;
    z-index: 0;
    font-size: 1.2rem;
    border-color: rgba(223, 225, 229, 0);
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    background-color: $color-white;
    opacity: 0.9;
  }

  ._item {
    color: inherit;
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    -webkit-tap-highlight-color: transparent;

    &:focus {
      color: $color-primarily;
      outline: none;
    }

    &.-active {
      color: $color-primarily;
    }
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
