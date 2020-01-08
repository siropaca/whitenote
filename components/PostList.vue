<template>
  <div>
    <h2 v-show="listTitle" class="c-list-title">
      {{ listTitle }}
    </h2>
    <div class="c-post-list">
      <ul>
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
    </div>
  </div>
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
    },
    listTitle: {
      type: String,
      default: () => {
        return ''
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
.c-list-title {
  color: $color-middlegray;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;

  ._icon {
    font-size: 1rem;
    margin-right: 0.1rem;
  }
}

.c-post-list {
  ._item {
    margin-bottom: 1rem;
    user-select: none;
    transition-property: transform;
    transition-duration: 0.2s;
    -webkit-touch-callout: none;
    position: relative;

    @include media($breakpoint-tablet) {
      display: inline-block;
      width: calc(50% - 0.5rem);

      &:nth-child(odd) {
        margin-right: 0.5rem;
      }

      &:nth-child(even) {
        margin-left: 0.5rem;
      }
    }

    @include media($breakpoint-pc) {
      display: inline-block;
      width: calc(33.3% - (2rem / 3));

      &:nth-of-type(3n - 2) {
        margin-right: calc(2rem / 4);
        margin-left: 0;
      }

      &:nth-of-type(3n -7) {
        margin-right: calc(2rem / 4);
        margin-left: calc(2rem / 4);
      }

      &:nth-of-type(3n) {
        margin-right: 0;
        margin-left: calc(2rem / 4);
      }

      &:last-child {
        margin-bottom: 1.4rem;
      }
    }

    &[data-id='0']:before {
      content: '非公開';
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      z-index: 10;
      font-size: 0.7rem;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-weight: bold;
      padding: 2px 5px;
      letter-spacing: 1px;
      border-radius: 5px;
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
      height: 0;
      padding-top: 63%;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.18);

      &:hover,
      &:visited {
        color: $color-white;
      }
    }

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
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
        margin-bottom: 0.3rem;

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
