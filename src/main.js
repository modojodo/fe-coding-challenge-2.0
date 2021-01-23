import Vue from 'vue'
import Survey from './Survey.vue'
import { router } from './route'

Vue.config.productionTip = false

new Vue({
  render: h => h(Survey),
  router
}).$mount('#app')
