<template>
  <div class="c-postbody js-postbody" v-html="$md.render(contents)"></div>
</template>

<script>
import '~/node_modules/highlight.js/styles/hopscotch.css'

export default {
  props: {
    contents: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  mounted() {
    const self = this
    self.getATag().forEach((el) => {
      el.addEventListener('click', self.openNewWin)
    })
  },
  destroyed() {
    const self = this
    self.getATag().forEach((el) => {
      el.removeEventListener('click', self.openNewWin)
    })
  },
  methods: {
    getATag() {
      return document
        .getElementsByClassName('js-postbody')[0]
        .querySelectorAll('a')
    },
    openNewWin(e) {
      e.preventDefault()
      const url = e.target.getAttribute('href')
      window.open(url)
    }
  }
}
</script>

<style lang="scss">
.c-postbody {
  $side-padding: 1rem;

  padding: 2rem $side-padding;
  line-height: 1.8;
  word-break: break-word;
  overflow: hidden;

  @include media($breakpoint-pc) {
    padding-right: 0;
    padding-left: 0;
    line-height: 2;
  }

  > *:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h2 {
    margin: 2rem 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  h3 {
    margin: 2rem 0 0.5rem 0;
    font-weight: bold;
  }

  > ul {
    margin-bottom: 1.5rem;
    padding-left: 1.6rem;

    li {
      list-style: disc;
      margin: 0.2rem 0;

      ul {
        padding-left: 1.5rem;
      }
    }
  }

  hr {
    border: none;
    line-height: 1;
    margin: 2.7rem 0 2.4rem 0;
    text-align: center;
    font-size: 1.7rem;
    color: $color-middlegray;
    letter-spacing: 1.4rem;
    text-indent: 1.4rem;

    &::before {
      content: '***';
    }
  }

  strong {
    font-weight: bold;
  }

  p {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    code {
      background-color: $color-lightgray;
      padding: 0.1rem 0.3rem;
      border-radius: 4px;
      margin-right: 0.1rem;
    }

    a {
      margin-right: 0.1rem;
    }
  }

  img {
    width: 100%;
    border: solid 1px $color-lightgray;
  }

  .-full {
    margin-right: -$side-padding !important;
    margin-left: -$side-padding !important;

    @include media($breakpoint-pc) {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }

    img {
      border-right: none;
      border-left: none;

      @include media($breakpoint-pc) {
        border: solid 1px $color-lightgray;
      }
    }
  }

  blockquote {
    border-left: solid 0.3rem $color-middlegray;
    padding: 0.3rem 1rem;
    opacity: 0.6;
  }

  table {
    display: block;
    overflow: auto;
    margin-bottom: 1.5rem;
    border-collapse: collapse;

    th {
      font-weight: bold;
    }

    th,
    td {
      padding: 0.5rem 0.8rem;
      border: solid 1px $color-middlegray;
    }

    tbody tr:nth-child(odd) {
      background-color: $color-lightgray;
    }
  }

  //--- hljs ---
  .hljs {
    margin: 1.5rem 0;
    line-height: 1.5;
    padding: 1rem 1.25rem;
    background-color: #282c34;
    overflow: auto;
    position: relative;

    @include media($breakpoint-pc) {
      line-height: 1.6;
      padding: 1.25rem 1.5rem;
    }

    &[data-tip] {
      padding-top: 3rem;
    }

    &[data-tip]::before {
      content: attr(data-tip);
      display: inline-block;
      position: absolute;
      top: 0.9rem;
      left: 0.6rem;
      padding: 0 0.6rem;
      letter-spacing: 1px;
      font-size: 0.75rem;
      line-height: 1.7;
      border-radius: 15px;
      color: $color-white;
      background: linear-gradient(135deg, #179fcf 0%, #2c4ff7 100%);

      @include media($breakpoint-pc) {
        left: 0.85rem;
      }
    }
  }
}
</style>
