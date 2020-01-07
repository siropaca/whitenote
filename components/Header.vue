<template>
  <header class="c-header">
    <div class="o-inner -m">
      <div class="_contents">
        <nuxt-link :to="{ name: 'index' }">
          <SiteLogo />
        </nuxt-link>

        <nuxt-link :to="{ name: 'search' }">
          <i class="fas fa-search"></i>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
import SiteLogo from '~/components/SiteLogo.vue'

export default {
  components: {
    SiteLogo
  }
}
</script>

<style lang="scss">
.c-header {
  display: flex;
  align-items: center;
  padding: 0 0.9rem;
  height: $header-height;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(5px);

  @include media($breakpoint-tablet) {
    position: sticky;
  }

  @include media($breakpoint-pc) {
    position: sticky;
  }

  @include media($container-width-m) {
    padding: 0;
  }

  ._contents {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .fas {
      font-size: 1.4rem;
      padding: 0 0.5rem;
      vertical-align: middle;
    }
  }
}
</style>
