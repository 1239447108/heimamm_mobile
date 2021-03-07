import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/storage'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      needLogin: false
    }
  },
  {
    path: '/',
    component: () => import('@/views/home'),
    children: [
      {
        path: '/my',
        component: () => import('@/views/my'),
        meta: {
          needLogin: true
        }
      },
      {
        path: '/find',
        component: () => import('@/views/find'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/question',
        component: () => import('@/views/question'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/company',
        component: () => import('@/views/company'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/info',
        component: () => import('@/views/info'),
        meta: {
          needLogin: true
        }
      },
      {
        path: '/editinfo',
        component: () => import('@/views/editInfo'),
        meta: {
          needLogin: true
        }
      },
      {
        path: '/technicList',
        component: () => import('@/views/technicList'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/shareList',
        component: () => import('@/views/shareList'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/technicDetail/:id',
        component: () => import('@/views/technicDetail'),
        props: false
      },
      {
        path: '/shareDetail/:id',
        component: () => import('@/views/shareDetail'),
        props: false
      },
      {
        path: '/chart',
        component: () => import('@/views/chart'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/search',
        component: () => import('@/views/search'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/',
        redirect: '/find'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const pathArr = ['/company', '/question', '/find', '/my']
  const token = getToken('hm_m_token')
  // 只在4个tab里显示tabbar
  if (pathArr.some(item => item === to.path)) {
    store.commit('setIsTabbarShow', true)
  } else {
    store.commit('setIsTabbarShow', false)
  }
  if (to.path === '/company' || to.path === '/find' || to.path === '/login') return next()
  if (!token) return next('/login')
  next()
})
export default router
