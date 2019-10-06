<template>
  <div>
    <header class="c-header">
      <div class="o-inner">
        <div class="header-contents">
          <nuxt-link :to="{ name: 'index' }">
            <img src="~/assets/images/logo.svg" alt="WhiteNote" class="logo" />
          </nuxt-link>

          <i class="fas fa-bars"></i>
        </div>
      </div>
    </header>
    <div class="c-dummy-header"></div>
  </div>
</template>
