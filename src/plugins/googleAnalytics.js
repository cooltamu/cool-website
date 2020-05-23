import Vue from 'vue'
import router from '@/router'
import VueAnalytics from 'vue-analytics'

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-167109323-1',
    router
  })
}
