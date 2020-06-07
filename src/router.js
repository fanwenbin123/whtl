import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/cookies'
import Home from './views/home.vue'

Vue.use(Router)

const router =  new Router({
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
      path: '/taskingDetail',
      name: 'taskingDetail',
      component: () => import('@/views/components/Tasking')
    },
    {
      path: '/Addinfo',
      name: 'Addinfo',
      component: () => import('@/views/components/Addinfo')
      
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }

  ]
})

/** 不需要登录的页面 */
const WHITE_LIST = ['/login']

router.beforeEach(async (to, from, next) => {
  if (WHITE_LIST.includes(to.path)) return next()
  // 没有 Token 重定向到登录页
  if (!getToken()) return next('/login')
  //const map = store.getters['right/map']
  // 开发环境下, 不做路由管制
  //if (process.env.NODE_ENV === 'development') return next()
  // 生产环境下, 不在权限内的路由禁止跳转
 // if (!(to.path in map) && from.path in map) return next(from.path)
  next()
})
export default router