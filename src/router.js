import Vue from 'vue'
import Router from 'vue-router'
// import { getToken } from '@/utils/cookies'
import Home from './views/home.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import store from './store'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            title: '任务管理',
            leftArrow: false,
            rightType: true
          }
        },
        {
          path: '/help',
          name: 'help',
          component: () => import('@/views/help'),
          meta: {
            title: '帮助',
            leftArrow: false
          }
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('@/views/report'),
          meta: {
            title: '上报',
            leftArrow: false,
          }
        },
        {
          path: '/set',
          name: 'set',
          component: () => import('@/views/set'),
          meta: {
            title: '设置',
            leftArrow: false
          }
        },
        {
          path: '/CompletedDetail',
          name: 'CompletedDetail',
          component: () => import('@/views/completedDetail'),
          leftArrow: true

        },
        {
          path: '/taskingDetail',
          name: 'taskingDetail',
          component: () => import('@/views/components/Tasking'),
          leftArrow: true
        },
        {
          path: '/Addinfo',
          name: 'Addinfo',
          component: () => import('@/views/components/Addinfo'),
          meta: {
            leftArrow: true
          }

        },
        {
          path: '/password',
          name: 'password',
          component: () => import('@/views//password'),
          meta: {
            title: '修改密码',
            leftArrow: true
          }

        },
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login'),
      meta: {
        noFooter: true
      }
    },

  ]
})

/** 不需要登录的页面 */
const WHITE_LIST = ['/login']

router.beforeEach(async (to, from, next) => {
  if (WHITE_LIST.includes(to.path)) return next()
  // 没有 Token 重定向到登录页
  let token = store.state.token || localStorage.getItem('token');
  if (!token) return next('/login')
  //const map = store.getters['right/map']
  // 开发环境下, 不做路由管制
  //if (process.env.NODE_ENV === 'development') return next()
  // 生产环境下, 不在权限内的路由禁止跳转
  // if (!(to.path in map) && from.path in map) return next(from.path)
  next()
})
export {
  WHITE_LIST,
  router
}