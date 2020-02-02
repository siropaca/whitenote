<template>
  <div class="c-humburger">
    <div class="_icon js-humburger" @click="onClickHumburger">
      <i class="fas fa-bars"></i>
    </div>

    <ul class="_list js-menu-list" :style="menuListStyle" @click="closeMenu">
      <li
        v-for="(item, index) in menuList"
        :key="index"
        :class="item.listClass"
        @click="onClickMenuItem(item.pageName)"
      >
        {{ item.listName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          listName: 'Top',
          pageName: 'index',
          listClass: ''
        },
        {
          listName: 'Search',
          pageName: 'search',
          listClass: ''
        },
        {
          listName: 'About',
          pageName: 'about',
          listClass: ''
        },
        {
          listName: 'Privacy Policy',
          pageName: 'privacyPolicy',
          listClass: ''
        }
      ],
      menuListStyle: {}
    }
  },
  methods: {
    onClickHumburger() {
      this.openMenu()
    },
    onClickMenuItem(pageName) {
      if (pageName) {
        this.$router.push({ name: pageName })
      }

      this.closeMenu()
    },
    openMenu() {
      this.menuListStyle = {
        display: 'flex'
      }

      const listItem = document.querySelectorAll('.js-menu-list li')
      listItem.forEach((el, index) => {
        el.style.left = '-2rem'

        setTimeout(() => {
          el.style.opacity = 1
          el.style.left = 0
        }, index * 200)
      })
    },
    closeMenu() {
      const listItem = document.querySelectorAll('.js-menu-list li')

      listItem.forEach((el, index) => {
        setTimeout(() => {
          el.style.left = '2rem'
          el.style.opacity = 0

          if (index + 1 === listItem.length) {
            setTimeout(() => {
              this.menuListStyle = {}
            }, 500)
          }
        }, index * 150)
      })
    }
  }
}
</script>

<style lang="scss">
.c-humburger {
  ._list {
    display: none;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    text-align: center;
    opacity: 0.9;

    li {
      transition: 0.15s;
      position: relative;
      left: -2rem;
      width: 100%;
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 3.5rem;
      letter-spacing: 0.2rem;
      opacity: 0;
      cursor: pointer;

      &:hover {
        color: $color-primarily;
      }
    }
  }
}
</style>
