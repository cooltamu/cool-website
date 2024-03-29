import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/styles/main.sass'
// import colors from 'vuetify/es5/util/colors'
// import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const theme = JSON.parse(localStorage.getItem('dark')) || false
const opts = {
  theme: {
    themes: {
      light: {
        primary: '#20A29A',
        secondary: '#f32d49',
        accent: '#fe5750'
      },
      dark: {
        primary: '#20A29A',
        secondary: '#f32d49',
        accent: '#fe5750'
      }
    },
    dark: theme !== false
  },
  iconfont: 'mdi'
}

export default new Vuetify(opts)
