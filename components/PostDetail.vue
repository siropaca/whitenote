<template>
  <main class="c-postdetail">
    <div class="_postheader">
      <img :src="post.url" :alt="post.alt" />
      <div class="_filter"></div>

      <div class="_postinfo">
        <div class="o-inner -m">
          <h1 class="_title">{{ post.title }}</h1>
          <time class="_date">{{ post.post_date | fmtDate }}</time>
          <div v-if="post.categorys" class="_categorys">
            <a
              v-for="(category, index) in makeCatAry(post.categorys)"
              :key="index"
              class="_catitem"
              href="#"
            >
              <i class="fas fa-tag"></i>
              {{ category }}
            </a>
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
      return `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`
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
    makeCatAry(categorys) {
      return categorys ? categorys.split(',') : []
    }
  }
}
</script>

<style lang="scss">
.c-postdetail {
  //--- eyecatch ---
  ._postheader {
    padding-top: 55%;
    height: 0;
    position: relative;
    overflow: hidden;

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
      background-color: rgba(0, 0, 0, 0.2);
    }

    ._postinfo {
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

      ._categorys {
        margin-top: 0.5rem;

        @include media($breakpoint-pc) {
          margin-top: 0.7rem;
        }
      }

      ._catitem {
        color: $color-white;
        text-decoration: none;
        font-size: 0.65rem;
        padding: 0.15rem 0.5rem;
        margin-right: 0.6rem;
        border: solid 1px $color-white;
        border-radius: 5px;
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
