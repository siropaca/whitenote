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

          <HamburgerMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SiteLogo from '~/components/SiteLogo.vue'
import HamburgerMenu from '~/components/HamburgerMenu.vue'

export default {
  components: {
    SiteLogo,
    HamburgerMenu
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

        .fas {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
