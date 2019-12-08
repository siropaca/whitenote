import axios from 'axios'
import TerserPlugin from 'terser-webpack-plugin'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%sWhiteNote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-widthf, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      {
        name: 'google-site-verification',
        content: 'MVMDNQVr5eFOn_a11sAFxAqVEyz2jjfKYa98b2CYwgM'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/whitenote/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/whitenote/apple-touch-icon.png' },
      {
        rel: 'apple-touch-icon-precomposed',
        href: '/whitenote/apple-touch-icon-precomposed.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2c75b6' },
  /*
   ** Global CSS
   */
  css: [
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/style/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/ga.js', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://www.npmjs.com/package/@nuxtjs/sitemap
    '@nuxtjs/sitemap',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://www.npmjs.com/package/markdown-it
    '@nuxtjs/markdownit'
  ],
  sitemap: {
    hostname: 'https://s10i.me/whitenote',
    path: '/sitemap.xml',
    exclude: ['/categorys'],
    routes(callback) {
      axios
        .get('https://s10i.me/api/v1/posts')
        .then((res) => {
          const routes = res.data.map((posts) => {
            return '/posts/' + posts.id
          })
          callback(null, routes)
        })
        .catch(callback)
    },
    filter({ routes }) {
      return routes.map((route) => {
        route.url = `whitenote${route.url}`
        return route
      })
    }
  },
  dotenv: {
    path: './config/',
    filename: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev'
  },
  axios: {},
  styleResources: {
    scss: [
      '~/assets/style/settings/_setting.scss',
      '~/assets/style/tools/_mixins.scss'
    ]
  },
  markdownit: {
    injected: true,
    linkify: true,
    html: true,
    highlight: (str, lang) => {
      const hljs = require('highlight.js')
      const langAry = lang.split('.')
      const isFilename = langAry.length === 2
      const ext = isFilename ? langAry[1] : lang
      const data = isFilename ? `data-tip="${lang}"` : ''
      const type = lang && hljs.getLanguage(ext) ? ext : 'plaintext'
      return `<pre class="hljs -full" ${data}><code>${
        hljs.highlight(type, str, true).value
      }</code></pre>`
    },
    use: [
      // Doc: https://www.npmjs.com/package/markdown-it-attrs
      'markdown-it-attrs'
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: false
        })
      ]
    }
  },
  router: {
    base: '/whitenote/'
  }
}
