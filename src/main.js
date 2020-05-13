import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker.js'
import router from './router'

Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(App),
  data:{  snapshotItems : [
    {
      ref: "#",
      imageRef:"about.jpg",
      title:"test",
    }
],
}

}).$mount('#app')
