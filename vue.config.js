module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/cool-website/' : '/'
}
