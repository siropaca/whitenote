<template>
  <header class="c-header">
    <div class="o-inner -m">
      <div class="header-contents">
        <nuxt-link :to="{ name: 'index' }">
          <img
            src="~/assets/images/b-logo.svg"
            alt="WhiteNote"
            class="logo -black"
          />
          <img
            src="~/assets/images/w-logo.svg"
            alt="WhiteNote"
            class="logo -white"
          />
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.c-header {
  display: flex;
  align-items: center;
  padding: 0 0.9rem;
  height: $header-height;

  @include media($container-width-m) {
    padding: 0;
  }

  .header-contents {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .fas {
      font-size: 1.5rem;
      margin: 0 0.4rem;
    }
  }

  .logo {
    height: 1.3rem;

    &.-white {
      display: none;
    }
  }
}
</style>
