<template>
  <div class="o-container">
    <div class="o-inner -m">
      <div class="o-padding">
        <!-- <div class="c-search-box">
          <h2 class="c-list-title">Search</h2>
          <div v-show="!keyword" class="_placeholder">
            <i class="fas fa-search"></i>検索キーワード
          </div>
          <input v-model="keyword" type="text" />
        </div> -->

        <div v-show="!Object.keys(searchRsult).length" class="c-tag-list">
          <h2 class="c-list-title">Tags</h2>
          <ul class="_list">
            <li
              v-for="(tag, index) in tagList"
              :key="index"
              :style="{
                backgroundColor: tag.bg_color,
                color: tag.font_color
              }"
              class="_itme"
            >
              <nuxt-link :to="createTagUrl(tag.slug)">
                <div class="_tag-name">
                  {{ tag.value }} ({{ tag.post_num }})
                </div>
                <img :src="tag.logo_url" :alt="tag.logo_alt" class="_logo" />
              </nuxt-link>
            </li>
          </ul>
        </div>

        <PostList :posts="searchRsult" :list-title="searchRsultTitle" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PostList from '~/components/PostList.vue'

export default {
  components: {
    PostList
  },
  data() {
    return {
      keyword: '',
      tagList: [],
      searchRsult: [],
      searchRsultTitle: ''
    }
  },
  head() {
    return {
      title: 'Search',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  },
  asyncData({ query, params, error }) {
    return axios
      .get('https://s10i.me/api/v1/tags', {
        headers: { 'x-api-key': process.env.API_KEY }
      })
      .then((res) => {
        return { tagList: res.data }
      })
      .catch((e) => {
        const res = e.response
        error({ statusCode: res.status, message: res.statusText })
      })
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.checkRefresh()
  },
  created() {
    this.checkRefresh()
  },
  methods: {
    createTagUrl(slug) {
      return `/search?tag=${slug}`
    },
    checkRefresh() {
      const tag = this.$route.query.tag
      if (tag) {
        this.slug = tag
        this.getTagDetail()
        return
      }

      this.searchRsult = []
    },
    getTagDetail() {
      axios
        .get(`https://s10i.me/api/v1/search`, {
          headers: { 'x-api-key': process.env.API_KEY },
          params: {
            tag: this.slug
          }
        })
        .then((res) => {
          if (!res.data.length) return
          this.searchRsult = res.data

          const self = this
          const result = this.tagList.filter(
            (item) => item.slug === self.slug
          )[0]

          this.searchRsultTitle = 'Tags: ' + result.value
        })
        .catch((e) => {
          // const res = e.response
        })
    }
  }
}
</script>

<style lang="scss">
.c-list-title {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.c-search-box {
  position: relative;
  margin-bottom: 1.5rem;

  input[type='text'] {
    width: 100%;
    border-radius: $border-radius;
    line-height: 2.3rem;
    padding: 0 0.7rem;
    font-size: 1rem;
  }

  ._placeholder {
    position: absolute;
    z-index: 10;
    color: $color-gray;
    line-height: 2.3rem;
    margin-left: 0.7rem;

    .fa-search {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
}

.c-tag-list {
  ._list {
    display: flex;
    flex-wrap: wrap;

    a,
    a:visited {
      color: inherit;
      display: block;
      height: 100%;
    }

    ._itme {
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      width: calc(50% - 0.5rem);
      margin-bottom: 1rem;
      border-radius: $border-radius;
      color: $color-black;
      font-weight: bold;
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: center center;
      height: 6.2rem;

      a {
        padding: 0.4rem 0.5rem;
      }

      ._tag-name {
        position: relative;
        z-index: 10;
      }

      ._logo {
        width: 7rem;
        position: absolute;
        right: -1.5rem;
        bottom: -1.5rem;
        z-index: 0;
      }

      @include media($breakpoint-tablet) {
        height: 8rem;

        a {
          padding: 0.5rem 0.8rem;
        }

        ._tag-name {
          font-size: 1.2rem;
        }

        ._logo {
          width: 8.8rem;
        }
      }

      @include media($breakpoint-pc) {
        height: 11rem;

        a {
          padding: 0.5rem 0.9rem;
        }

        ._tag-name {
          font-size: 1.5rem;
        }

        ._logo {
          width: 11.5rem;
        }
      }

      &:nth-child(odd) {
        margin-right: 0.5rem;
      }

      &:nth-child(even) {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
