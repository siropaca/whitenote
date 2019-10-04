<template>
  <div class="header">
    <nuxt-link :to="{ name: 'index' }">
      <img src="~/assets/images/logo.svg" alt="WhiteNote" class="logo" />
    </nuxt-link>
  </div>
</template>

<style>
.header {
  padding: 0.5rem;
}
.header .logo {
  height: 1.5rem;
}
</style>
