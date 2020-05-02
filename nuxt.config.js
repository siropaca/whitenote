import axios from 'axios'
import TerserPlugin from 'terser-webpack-plugin'
require('dotenv').config({ path: `config/.env.${process.env.NODE_ENV}` })

export default {
  mode: 'universal',
  /**
   * Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: `%s - ${process.env.SITE_NAME}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-widthf, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no'
      },
      {
        name: 'google-site-verification',
        content: 'MVMDNQVr5eFOn_a11sAFxAqVEyz2jjfKYa98b2CYwgM'
      },
      { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.BASE_URL}/`
      },
      { hid: 'og:title', property: 'og:title', content: process.env.SITE_NAME },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL}/ogp.png`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: ''
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    // script: [
    //   {
    //     'data-ad-client': 'ca-pub-2267300810538312',
    //     async: true,
    //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    //   }
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/whitenote/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/whitenote/apple-touch-icon.png' },
      {
        rel: 'apple-touch-icon-precomposed',
        href: '/whitenote/apple-touch-icon-precomposed.png'
      }
    ]
  },
  /**
   * Customize the progress-bar color
   */
  loading: { color: '#2c75b6' },
  /**
   * Global CSS
   */
  css: [
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/style/main.scss'
  ],
  /**
   * Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/ga.js', mode: 'client' },
    { src: '~/plugins/outliner.js', mode: 'client' }
  ],
  /**
   * Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /**
   * Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://www.npmjs.com/package/markdown-it
    '@nuxtjs/markdownit',
    // Doc: https://www.npmjs.com/package/@nuxtjs/sitemap
    '@nuxtjs/sitemap',
    // Doc: https://www.npmjs.com/package/@nuxtjs/feed
    '@nuxtjs/feed'
  ],
  sitemap: {
    hostname: `${process.env.HOST_NAME}/`,
    path: '/sitemap.xml',
    exclude: ['/search'],
    routes(callback) {
      axios
        .get(`${process.env.BASE_API_URL}/sitemap`, {
          headers: { 'x-api-key': process.env.API_KEY }
        })
        .then((res) => {
          const routes = res.data.map((post) => {
            return '/post/' + post.id
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
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: process.env.SITE_NAME,
          id: `${process.env.BASE_URL}/`,
          link: `${process.env.BASE_URL}/feed.xml`,
          description: 'This is my personal feed!',
          language: 'ja',
          author: {
            name: process.env.AUTHOR
          },
          copyright: `All rights reserved 2019, ${process.env.AUTHOR}`
        }

        const posts = await axios
          .get(`${process.env.BASE_API_URL}/posts/`, {
            headers: { 'x-api-key': process.env.API_KEY }
          })
          .then((res) => {
            return res.data
          })

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            link: `${process.env.BASE_URL}/post/${post.id}`,
            description:
              post.description ||
              post.contents
                .replace(/```(.|\s)*?```|`|!?\[.*\)?[)|*}]|\r?\n/g, '')
                .slice(0, 110) + ' [&#8230;]',
            content: post.contents.replace(/```(.|\s)*?```|`|!?\[.*\)?[)|*}]/g, ''),
            date: new Date(post.post_date),
            image: post.url
          })
        })

        feed.addContributor({
          name: process.env.AUTHOR,
          link: `${process.env.BASE_URL}/`
        })

        feed.addCategory('blog')
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    }
  ],
  dotenv: {
    path: './config/',
    filename: `.env.${process.env.NODE_ENV}`
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
      const newLang = lang.split('.').pop()
      const langObj = hljs.getLanguage(newLang)
      let tip = ''
      if (lang && (langObj === undefined || lang.split('.').length > 1)) {
        tip = `data-tip="${lang}"`
      }
      const type = langObj ? newLang : 'plaintext'
      return `<pre class="hljs -full" ${tip}><code>${
        hljs.highlight(type, str, true).value
      }</code></pre>`
    },
    use: [
      // Doc: https://www.npmjs.com/package/markdown-it-attrs
      'markdown-it-attrs'
    ]
  },
  /**
   * Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /**
     * You can extend webpack config here
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
