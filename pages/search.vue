<template>
  <div class="o-container">
    <div class="o-inner -m">
      <div class="o-padding">
        <div class="c-search-box">
          <h2>Search</h2>
          <div v-show="isShowPlaceholder" class="_placeholder">
            <i class="fas fa-search"></i>検索キーワード
          </div>
          <input
            v-model="keyword"
            type="text"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>

        <div v-show="!Object.keys(searchRsult).length" class="c-tag-list">
          <h2>Tags</h2>
          <ul class="_list">
            <li
              v-for="(tag, index) in tags"
              :key="index"
              :style="{ backgroundImage: createUrl(tag.url) }"
              :data-slug="tag.slug"
              class="_itme"
              @click="onTagClick"
            >
              <div class="_tag-name">{{ tag.value }} ({{ tag.post_num }})</div>
            </li>
          </ul>
        </div>

        <PostList :posts="searchRsult" />
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
      searchRsult: [],
      keyword: '',
      slug: '',
      isShowPlaceholder: false
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
      .get(`https://s10i.me/api/v1/tags`, {
        headers: { 'x-api-key': process.env.API_KEY }
      })
      .then((res) => {
        return { tags: res.data }
      })
      .catch((e) => {
        const res = e.response
        error({ statusCode: res.status, message: res.statusText })
      })
  },
  mounted() {
    this.cheackPlaceholder()
  },
  methods: {
    createUrl(url) {
      return `url(${url})`
    },
    onTagClick(e) {
      const slug = e.target.dataset.slug

      if (!slug) return

      this.slug = slug

      this.getTagDetail()
    },
    onFocus() {
      this.isShowPlaceholder = false
    },
    onBlur() {
      this.cheackPlaceholder()
    },
    cheackPlaceholder() {
      this.isShowPlaceholder = this.keyword === ''
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
          history.replaceState('', '', `search?tag=${this.slug}`)
        })
        .catch((e) => {
          // const res = e.response
        })
    }
  }
}
</script>

<style lang="scss">
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

    ._itme {
      flex-shrink: 0;
      width: calc(50% - 0.5rem);
      margin-bottom: 1rem;
      border-radius: $border-radius;
      padding: 0.4rem 0.5rem;
      color: $color-black;
      font-weight: bold;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      min-height: 6rem;
      cursor: pointer;

      @include media($breakpoint-tablet) {
        min-height: 8rem;
        padding: 0.5rem 0.8rem;

        ._tag-name {
          font-size: 1.2rem;
        }
      }

      @include media($breakpoint-pc) {
        min-height: 10rem;
        padding: 0.5rem 0.9rem;

        ._tag-name {
          font-size: 1.4rem;
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
