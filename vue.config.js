module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/cool-website/' : '/',
  pwa: {
    name: 'COOL',
    short_name: 'COOL',
    themeColor: '#20A29A',
    msTileColor: '#20A29A',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestPath: 'site.webmanifest',
    manifestOptions: {
      start_url: '/dashboard/home',
      display: 'standalone',
      scope: '/'
    },
    iconPaths: {
      favicon32: 'favicon-32x32.png',
      favicon16: 'favicon-16x16.png',
      appleTouchIcon: 'apple-touch-icon.png',
      maskIcon: 'safari-pinned-tab.svg',
      msTileImage: 'mstile-150x150.png'
    },
    workboxOptions: {
      exclude: ['/CNAME', 'CNAME']
    }
  }
}
