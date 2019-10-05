<template>
  <div>
    <Header />

    <div>かてごりーページ</div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  head() {
    return {
      title: `カテゴリー - `
    }
  }
}
</script>
