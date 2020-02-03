<template>
  <main class="c-post-detail">
    <div class="_post-header">
      <img :src="post.url" :alt="post.alt" />
      <div class="_filter"></div>

      <div class="_post-info">
        <div class="o-inner -m">
          <h1 class="_title">{{ post.title }}</h1>
          <time class="_date">{{ post.post_date | fmtDate }}</time>
          <div v-if="post.tags" class="_tags">
            <nuxt-link
              v-for="(tag, index) in createTagAry(post.tags)"
              :key="index"
              class="_tag-item"
              to="/"
            >
              <i class="fas fa-tag"></i>
              {{ tag }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="o-container">
      <div class="o-inner -s">
        <PostBody :contents="post.contents" />
      </div>
    </div>
  </main>
</template>

<script>
import PostBody from '~/components/PostBody.vue'

export default {
  components: {
    PostBody
  },
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
    post: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    createTagAry(tags) {
      return tags ? tags.split(',') : []
    }
  }
}
</script>

<style lang="scss">
.c-post-detail {
  ._post-header {
    padding-top: 55%;
    height: 0;
    position: relative;
    overflow: hidden;

    @include media($breakpoint-tablet) {
      padding-top: 40%;
    }

    @include media($breakpoint-pc) {
      padding-top: 30%;
    }

    img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
    }

    ._filter {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(3px);
    }

    ._post-info {
      color: $color-white;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 2rem 1rem 0.5rem;
      line-height: 1.35;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(transparent),
        to(rgba(0, 0, 0, 0.65))
      );
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.65) 100%
      );

      ._title {
        font-weight: bold;
        font-size: 1.5rem;

        @include media($breakpoint-pc) {
          font-size: 1.7rem;
        }
      }

      ._date {
        font-size: 0.8rem;
        letter-spacing: 3px;
        opacity: 0.8;
        margin-top: 0.2rem;
        margin-bottom: 0.3rem;

        @include media($breakpoint-pc) {
          font-size: 0.9rem;
        }
      }

      ._tags {
        margin-top: 0.5rem;

        @include media($breakpoint-pc) {
          margin-top: 0.7rem;
        }
      }

      ._tag-item {
        color: $color-white;
        text-decoration: none;
        font-size: 0.65rem;
        padding: 0.15rem 0.5rem;
        margin-right: 0.6rem;
        border: solid 1px $color-white;
        border-radius: $border-radius;
        letter-spacing: 1px;
        opacity: 0.85;
        margin-bottom: 0.3rem;

        i {
          font-size: 0.55rem;
        }
      }
    }
  }
}
</style>
