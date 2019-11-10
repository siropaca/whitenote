<template>
  <div>
    <Header />

    <nuxt />

    <!-- <Fixmenu /> -->

    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
// import Fixmenu from '~/components/Fixmenu.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    // Fixmenu,
    Footer
  },
  mounted() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.changeTheme(darkModeMediaQuery.matches)

    darkModeMediaQuery.addListener((e) => {
      this.changeTheme(e.matches)
    })
  },
  methods: {
    changeTheme(isDark) {
      const body = document.body
      if (isDark) {
        body.classList.add('dark-theme')
        body.classList.remove('light-theme')
      } else {
        body.classList.add('light-theme')
        body.classList.remove('dark-theme')
      }
    }
  }
}
</script>
