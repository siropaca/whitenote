<template>
  <footer class="c-footer">
    <div class="o-inner -m">
      <div class="_socials">
        <a href="https://github.com/siropaca" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://twitter.com/siropaca" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/siro.pac.a/" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>

      <div class="_copyright">©︎ 2019 - All rights reserved - Siropaca</div>
    </div>
  </footer>
</template>

<style lang="scss">
.c-footer {
  padding: 1rem 0;
  background-color: $color-footer-bg;
  color: $color-gray;
  text-align: center;

  ._socials {
    margin: 1rem 0;

    a {
      color: inherit;
    }

    .fab {
      font-size: 1.7rem;
      margin: 0 1rem;
    }
  }

  ._copyright {
    margin-top: 1rem 0;
    font-size: 0.8rem;
  }
}
</style>
