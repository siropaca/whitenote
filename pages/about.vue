<template>
  <div class="c-about">
    <div class="_msg">
      This is About page.<br />
      Under Construction.
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'About',
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
.c-about {
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
