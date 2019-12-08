<template>
  <ul class="c-postlist">
    <li
      v-for="(post, index) in posts"
      :key="index"
      :data-id="post.status"
      class="_item"
      @touchstart="onTouchstart"
      @touchend="onTouchend"
    >
      <nuxt-link
        :to="{ name: 'posts-id', params: { id: post.id } }"
        no-prefetch
      >
        <img :src="post.url" :alt="post.alt" />
        <div class="_info">
          <h2 class="_title">{{ post.title }}</h2>
          <time class="_date">{{ post.post_date | fmtDate }}</time>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  filters: {
    fmtDate(date) {
      const dateObj = new Date(date.replace(/-/g, '/'))
      const y = dateObj.getFullYear()
      const m = dateObj.getMonth() + 1
      const d = dateObj.getDate()
      return `${y}/${m}/${d}`
    }
  },
  props: {
    posts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onTouchstart(e) {
      e.currentTarget.classList.add('-ontouch')
    },
    onTouchend(e) {
      e.currentTarget.classList.remove('-ontouch')
    }
  }
}
</script>

<style lang="scss">
.c-postlist {
  padding: 0.5rem 1.2rem 1.5rem 1.2rem;

  @include media($breakpoint-pc) {
    padding: 0.5rem 0 1.2rem 0;
  }

  ._item {
    margin-bottom: 1.4rem;
    user-select: none;
    transition-property: transform;
    transition-duration: 0.2s;
    -webkit-touch-callout: none;
    position: relative;

    @include media($breakpoint-pc) {
      display: inline-block;
      padding: 0 0.7rem;
      width: 33.3%;

      &:last-child {
        margin-bottom: 1.4rem;
      }
    }

    &[data-id='0']:before {
      content: '非公開';
      position: absolute;
      top: 0.5rem;
      left: 1.2rem;
      z-index: 10;
      font-size: 0.7rem;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-weight: bold;
      padding: 2px 5px;
      letter-spacing: 1px;
      border-radius: 4px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &.-ontouch {
      transform: scale(0.95, 0.95);
    }

    a {
      display: block;
      color: $color-white;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      border-radius: 10px;

      &:hover,
      &:visited {
        color: $color-white;
      }
    }

    img {
      width: 100%;
    }

    ._info {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 2rem 1rem 0.8rem;
      line-height: 1.4;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.65) 100%
      );

      ._title {
        font-weight: bold;
        font-size: 1.1rem;

        @include media($breakpoint-pc) {
          font-size: 1rem;
        }
      }

      ._date {
        font-size: 0.8rem;
        letter-spacing: 3px;
        opacity: 0.8;

        @include media($breakpoint-pc) {
          font-size: 0.7rem;
          line-height: 1rem;
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
