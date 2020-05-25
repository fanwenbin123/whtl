import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/CompletedDetail',
      name: 'CompletedDetail',
      component: () => import('@/views/completedDetail')
      
    },
    {
      path: '/Addinfo',
      name: 'Addinfo',
      component: () => import('@/views/components/Addinfo')
      
    }
  ]
})
