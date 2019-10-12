<template>
  <div>
    <Header />

    <nuxt />

    <Footer />

    <Fixmenu />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Fixmenu from '~/components/Fixmenu.vue'

export default {
  components: {
    Header,
    Footer,
    Fixmenu
  }
}
</script>
