import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/storage'
import { Toast } from 'vant'
import { getUserInfoApi } from '@/api/user'

Vue.use(VueRouter)

// 解决router报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    props: true,
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
          needLogin: true,
          // 是否需要显示tabbar
          needTabbar: true
        }
      },
      {
        path: '/find',
        component: () => import('@/views/find'),
        meta: {
          needLogin: false,
          needTabbar: true
        }
      },
      {
        path: '/question',
        component: () => import('@/views/question'),
        meta: {
          needLogin: true,
          needTabbar: true
        }
      },
      {
        path: '/company',
        component: () => import('@/views/company'),
        meta: {
          needLogin: false,
          needTabbar: true
        }
      },
      {
        path: '/companyDetail/:id',
        component: () => import('@/views/companyDetail'),
        props: true,
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
        path: '/technic',
        component: () => import('@/views/technic'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/share',
        component: () => import('@/views/share'),
        meta: {
          needLogin: false
        }
      },
      {
        path: '/technicDetail/:id',
        component: () => import('@/views/technicDetail'),
        props: true,
        meta: {
          needLogin: false
        }
      },
      {
        path: '/shareDetail/:id',
        component: () => import('@/views/shareDetail'),
        props: true,
        meta: {
          needLogin: false
        }
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
        path: '/companyPosition/:id',
        component: () => import('@/views/companyPosition'),
        props: true,
        meta: {
          needLogin: false
        }
      },
      {
        path: '/positionDetail/:id',
        component: () => import('@/views/positionDetail'),
        props: true,
        meta: {
          needLogin: false
        }
      },
      {
        path: '/companyQuestion/:id',
        component: () => import('@/views/companyQuestion'),
        props: true,
        meta: {
          needLogin: true
        }
      },
      {
        path: '/questionList',
        component: () => import('@/views/questionList'),
        meta: {
          needLogin: true
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

router.beforeEach(async (to, from, next) => {
  // 将滚动的距离记录下来
  from.meta.scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  // token
  const token = getToken('hm_m_token')
  // 是否登录
  const { isLogin } = store.state
  // 从哪个路径跳转过来
  const toPath = to.fullPath
  // 如果直接访问登录页面，则直接放行，不用加参数
  if (toPath === '/') return next()
  // 如果该页面需要登录
  if (to.meta.needLogin) {
    // 未登录
    if (!isLogin) {
      // 未登录且没有token
      if (!token) {
        Toast.fail('请登录')
        // 告诉login页面登录成功之后返回上一个页面
        return next('/login?redirect=' + toPath)
      } else {
        // 未登录但有token，则通过token获取用户信息
        try {
          const { data: res } = await getUserInfoApi()
          // 将用户信息存入vuex
          store.commit('setUserInfo', res.data)
          // 设置登录状态
          store.commit('setIsLogin', true)
        } catch (err) {
          // token过期或其他问题
          console.log(err)
          Toast.fail('请登录')
          // 告诉login页面登录成功之后返回上一个页面
          return next('/login?redirect=' + toPath)
        }
      }
    }
  }
  // 不需要登录、已登录或token有效则放行
  next()
})

router.afterEach((from, to) => {
  window.scrollTo(0, 0)
})
export default router
