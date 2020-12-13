import Vue from 'vue'
import '@/plugins/axios'
import vuetify from '@/plugins/vuetify'
import '@/plugins/veevalidate'
import '@/plugins/common'
import '@/plugins/googleAnalytics'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import VuetifyConfirm from 'vuetify-confirm'
import './registerServiceWorker'
import DatetimePicker from 'vuetify-datetime-picker'
import VueQuagga from 'vue-quaggajs'

Vue.config.productionTip = false
Vue.use(VuetifyConfirm, { vuetify })
Vue.use(DatetimePicker)
Vue.use(VueQuagga)

// Configuration VueAnalytics
// Vue.use(VueAnalytics, {
//   id: 'UA-167109323-1'
// })

const app = new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  }
}).$mount('#app')

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app
}
