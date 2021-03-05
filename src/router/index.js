import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/home'),
    children: [
      {
        path: '/my',
        component: () => import('@/views/my')
      },
      {
        path: '/find',
        component: () => import('@/views/find')
      },
      {
        path: '/question',
        component: () => import('@/views/question')
      },
      {
        path: '/company',
        component: () => import('@/views/company')
      },
      {
        path: '/info',
        component: () => import('@/views/info')
      },
      {
        path: '/editinfo',
        component: () => import('@/views/editInfo')
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
