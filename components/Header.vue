<template>
  <header class="c-header">
    <div class="o-inner -m">
      <div class="_contents">
        <nuxt-link :to="{ name: 'index' }">
          <SiteLogo />
        </nuxt-link>

        <div class="_icons">
          <!-- <nuxt-link :to="{ name: 'search' }" class="_icon">
            <i class="fas fa-search"></i>
          </nuxt-link> -->

          <Hamburger />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SiteLogo from '~/components/SiteLogo.vue'
import Hamburger from '~/components/Hamburger.vue'

export default {
  components: {
    SiteLogo,
    Hamburger
  }
}
</script>

<style lang="scss">
.c-header {
  display: flex;
  align-items: center;
  padding: 0 0.9rem;
  height: $header-height-s;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @include media($breakpoint-tablet) {
    position: sticky;
  }

  @include media($breakpoint-pc) {
    height: $header-height-m;
    position: sticky;
  }

  @include media($container-width-m) {
    padding: 0;
  }

  ._contents {
    display: flex;
    align-items: center;
    justify-content: space-between;

    ._icons {
      display: flex;

      ._icon {
        display: inline-block;
        font-size: 1.5rem;
        padding: 0 0.5rem;
        height: 2.5rem;
        width: 2.5rem;
        line-height: 2.5rem;
        text-align: center;

        @include media($breakpoint-pc) {
          font-size: 1.7rem;
        }

        .fas {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
