export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%sWhiteNote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}
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
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/node_modules/highlight.js/styles/hopscotch.css',
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/style/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://www.npmjs.com/package/markdown-it
    '@nuxtjs/markdownit',
    // Doc: https://www.npmjs.com/package/@nuxtjs/sitemap
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://siropaca.net/whitenote',
    path: '/sitemap.xml',
    exclude: [],
    routes (callback) {
      axios.get('https://siropaca.net/api/v1/posts')
      .then((res) => {
        var routes = res.data.map((posts) => {
          return '/posts/' + posts.id
        })
        callback(null, routes)
      })
      .catch(callback)
    }
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
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
    extend(config, ctx) {}
  },
  router: {
    base: '/whitenote/'
  },
  server: {
    port: 4001
  }
}
