<template>
  <div class="c-post-body js-post-body" v-html="$md.render(contents)"></div>
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

      const i = document.createElement('i')
      i.classList.add('fas', 'fa-external-link-alt')
      el.appendChild(i)
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
        .getElementsByClassName('js-post-body')[0]
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
.c-post-body {
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
    margin: 2.5em 0 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: '';
      width: 0.4rem;
      background-color: $color-primarily;
      position: absolute;
      top: 0.1rem;
      bottom: 0.1rem;
      left: 0;
      margin: auto;
    }
  }

  h3 {
    font-size: 1.1rem;
    margin: 2rem 0 0.5rem 0;
    font-weight: bold;
  }

  > ul {
    margin-bottom: 1.5rem;
    padding-left: 1.6rem;
    list-style: disc;

    li {
      margin: 0.2rem 0;

      ul {
        padding-left: 1.5rem;
        list-style-type: circle;
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

    a {
      margin-right: 0.1rem;
    }
  }

  img {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .-border {
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

  dl {
    margin-bottom: 1.5rem;

    dt {
      font-weight: 600;
    }

    dd {
      padding-left: 1rem;
    }
  }

  code {
    background-color: $color-lightgray;
    padding: 0.05rem 0.3rem 0.1rem 0.3rem;
    border-radius: $border-radius;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
  }

  .fa-external-link-alt {
    font-size: 0.85rem;
    margin-left: 0.4rem;
  }

  //--- hljs ---
  .hljs {
    margin: 1.5rem 0;
    line-height: 1.6;
    letter-spacing: 0.3px;
    padding: 1rem 1.25rem;
    background-color: #282c34;
    position: relative;
    word-break: keep-all;
    overflow: auto;

    @include media($breakpoint-pc) {
      line-height: 1.7;
      padding: 1.25rem 1.5rem;
    }

    code {
      background-color: transparent;
      padding: 0;
      border-radius: 0;
      margin-right: 0;
    }

    &[data-tip] {
      padding-top: 2.9rem;
    }

    &[data-tip]::before {
      content: attr(data-tip);
      display: inline-block;
      position: absolute;
      top: 0.8rem;
      left: 0.6rem;
      padding: 0 0.6rem;
      letter-spacing: 1px;
      font-size: 0.75rem;
      line-height: 1.7;
      border-radius: 15px;
      color: $color-white;
      background: linear-gradient(135deg, #179fcf 0%, #2c4ff7 100%);

      @include media($breakpoint-pc) {
        left: 0.8rem;
      }
    }
  }
}
</style>
