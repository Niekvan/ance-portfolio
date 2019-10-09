const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/_mixins.scss')
      ]
    })
}

module.exports = {
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
  siteName: 'Portfolio Ance',
  plugins: [
    {
      use: path.resolve('./src/plugins/source-storyblok'),
      options: {
        accessToken: process.env.STORYBLOK_TOKEN,
        contentTypes: ['page_project']
      }
    }
  ],
  templates: {
    page_project: '/:slug'
  }
}
