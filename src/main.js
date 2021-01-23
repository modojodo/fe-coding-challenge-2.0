import Vue from 'vue'
import Survey from './Survey.vue'
import { router } from './route'
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(Survey),
  router,
  store,
}).$mount('#app')
