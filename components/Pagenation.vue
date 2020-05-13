<template>
  <div class="c-pagenation">
    <nuxt-link
      v-if="prevPage.pageName"
      :to="{ name: prevPage.pageName, params: { page: prevPage.pageParam } }"
      class="_prev"
    >
      <i class="fas fa-arrow-left"></i>
      Previous page
    </nuxt-link>
    <nuxt-link
      v-if="nextPage.pageName"
      :to="{ name: nextPage.pageName, params: { page: nextPage.pageParam } }"
      class="_next"
    >
      Next page
      <i class="fas fa-arrow-right"></i>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    prevPage: {
      type: Object,
      default: () => {
        return {
          pageName: '',
          pageParam: ''
        }
      }
    },
    nextPage: {
      type: Object,
      default: () => {
        return {
          pageName: '',
          pageParam: ''
        }
      }
    }
  }
}
</script>

<style lang="scss">
.c-pagenation {
  text-align: center;

  a {
    border: 2px solid $color-primarily;
    border-radius: $border-radius;
    padding: 0.45rem 1.6rem;
    margin: 2rem 0.4rem 0.5rem 0.4rem;
    font-weight: 500;
    letter-spacing: 0.5px;

    @include media($breakpoint-tablet) {
      margin: 1.3rem 0.4rem 1.1rem 0.4rem;
    }

    @include media($breakpoint-pc) {
      margin: 1.3rem 0.4rem 1.1rem 0.4rem;
    }
  }

  ._prev {
    .fas {
      margin-right: 0.2rem;
    }
  }

  ._next {
    background: $color-primarily;
    color: $color-white;

    .fas {
      margin-left: 0.2rem;
    }
  }
}
</style>
