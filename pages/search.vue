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
        <div class="c-tag-list" v-show="!Object.keys(tagSearchRsult).length">
          <h2>Tags</h2>
          <ul class="_list">
            <li
              v-for="(tag, index) in tags"
              :key="index"
              class="_itme"
              :style="{ backgroundImage: createUrl(tag.url) }"
              :data-slug="tag.slug"
              @click="onClick"
            >
              <div class="_tag-name">{{ tag.value }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      searchRsult: {},
      tagSearchRsult: {},
      keyword: '',
      isShowPlaceholder: false
    }
  },
  head() {
    return {
      title: `Search - `,
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
        headers: { 'x-api-key': process.env.API_KEY },
        params: query
      })
      .then((res) => {
        return { tags: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'ページが見つかりません' })
      })
  },
  mounted() {
    this.cheackPlaceholder()
  },
  methods: {
    createUrl(url) {
      return `url(${url})`
    },
    onClick(e) {
      const data = e.target.dataset
      console.log(data.slug)
    },
    onFocus() {
      this.isShowPlaceholder = false
    },
    onBlur() {
      this.cheackPlaceholder()
    },
    cheackPlaceholder() {
      this.isShowPlaceholder = this.keyword === ''
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
    line-height: 2rem;
    padding: 0 0.5rem;
  }

  ._placeholder {
    position: absolute;
    z-index: 10;
    color: $color-gray;
    line-height: 2.1rem;
    margin-left: 0.5rem;

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
      padding: 0.5rem;
      color: $color-black;
      font-weight: bold;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      min-height: 7rem;
      cursor: pointer;

      @include media($breakpoint-pc) {
        min-height: 10rem;
        padding: 0.5rem 0.7rem;

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
