<template>
  <div class="c-privacy-policy">
    <div class="_msg">
      This is Privacy Policy page.<br />
      Under Construction.
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Privacy Policy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.c-privacy-policy {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ._msg {
    text-align: center;
    font-size: 1.7rem;
    color: $color-gray;
  }
}
</style>
