import Vue from 'vue'
import VueRouter from 'vue-router'
import Node from './components/Node.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Node },
]

const router = new VueRouter({ routes })

export { router, routes }