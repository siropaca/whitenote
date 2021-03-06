<template>
  <div class="c-post-body js-post-body">
    <!-- コンテンツ -->
    <slot />
  </div>
</template>

<script>
import '~/node_modules/highlight.js/styles/hopscotch.css'

export default {
  mounted() {
    const self = this
    self.getAnchor().forEach((el) => {
      el.addEventListener('click', self.openNewWin)

      const i = document.createElement('i')
      i.classList.add('fas', 'fa-external-link-alt')
      el.appendChild(i)
    })
  },
  destroyed() {
    const self = this
    self.getAnchor().forEach((el) => {
      el.removeEventListener('click', self.openNewWin)
    })
  },
  methods: {
    getAnchor() {
      return document
        .getElementsByClassName('js-post-body')[0]
        .querySelectorAll('a')
    },
    openNewWin(e) {
      e.preventDefault()
      const href = e.target.getAttribute('href')
      window.open(href)
    }
  }
}
</script>

<style lang="scss">
.c-post-body {
  $side-padding-s: 1rem;
  $side-padding-m: 2rem;

  padding: 2rem $side-padding-s;
  line-height: 1.8;
  word-break: break-word;

  @include media($breakpoint-tablet) {
    padding-right: $side-padding-m;
    padding-left: $side-padding-m;
  }

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

  h1 {
    font-size: 1.7rem;
    line-height: 1.7rem;
    font-weight: bold;
    margin: 0 0 1.4rem 0;
  }

  h2 {
    margin: 2.5rem 0 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
    position: relative;
    padding-left: 1.1rem;

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

  ul {
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

    a {
      display: block;
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

  em {
    font-size: 0.95rem;
    opacity: 0.7;
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

  a {
    font-weight: 600;

    &:hover {
      .fa-external-link-alt {
        display: inline-block;
      }
    }

    .fa-external-link-alt {
      display: none;
      font-size: 0.85rem;
      margin-left: 0.4rem;
    }
  }

  img {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: $border-radius;
  }

  .-border {
    border: solid 1px $color-lightgray;
  }

  .-full {
    margin-right: -$side-padding-s !important;
    margin-left: -$side-padding-s !important;

    @include media($breakpoint-tablet) {
      margin-right: -$side-padding-m !important;
      margin-left: -$side-padding-m !important;
    }

    @include media($breakpoint-pc) {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }

    img {
      border-right: none;
      border-left: none;
      border-radius: 0;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);

      @include media($breakpoint-tablet) {
        border-radius: 0;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
      }

      @include media($breakpoint-pc) {
        border-radius: $border-radius;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16);
      }
    }
  }

  blockquote {
    padding: 0.3rem 1rem 0.4rem 1rem;
    margin: 0 1rem 1.5rem 1rem;
    border-left: solid 0.25rem;

    @include media($breakpoint-tablet) {
      margin: 0 1rem 1.5rem 1rem;
    }

    @include media($breakpoint-pc) {
      margin: 0 1rem 1.5rem 1rem;
    }
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
      vertical-align: middle;
    }

    tbody tr:nth-child(odd) {
      background-color: $color-lightgray;
    }
  }

  dl {
    display: block;
    margin-bottom: 1.5rem;

    dt {
      font-weight: bold;
      font-size: 1.05rem;
      letter-spacing: 1px;
    }

    dd {
      padding-left: 1rem;
      margin-bottom: 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &.note {
      font-size: 0.8rem;
      border-radius: $border-radius;
      line-height: 1.5rem;
      padding: 0;

      dt {
        display: inline-block;
        font-size: 0.8rem;
        letter-spacing: 0;
        margin-bottom: 0.4rem;
        padding: 0 0.3rem 0 0.3rem;
        border-bottom: solid 1px;

        &:before {
          content: '\f303';
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-style: normal;
          -webkit-font-feature-settings: normal;
          font-feature-settings: normal;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
          margin-right: 0.35rem;
        }
      }

      dd {
        padding: 0;
        margin-bottom: 0;
      }
    }
  }

  code {
    background-color: $color-lightgray;
    padding: 0.05rem 0.3rem 0.1rem 0.3rem;
    border-radius: $border-radius;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
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
      margin-left: 0;
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
