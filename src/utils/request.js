import axios from 'axios'
import { getToken } from '@/utils/storage'
// import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})

// 请求拦截器
request.interceptors.request.use(
  request => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    const token = getToken('hm_m_token')
    // 如果需要使用token，则将其携带在headers中
    if (request.needToken) {
      request.headers.authorization = `Bearer ${token}`
    }
    return request
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    Toast.clear()
    const { code } = response.data
    if (code === 200) {
      return response
    }
    // 如果状态码异常，则返回上一个页面
    if (code === 400 || code === 401 || code === 403) {
      Toast.fail(response.data.message)
      // removeToken('hm_m_token')
      // store.commit('setIsLogin', false)
      router.go(-1)
    }
    return Promise.reject(new Error(response.data.message))
  },
  err => {
    return Promise.reject(err)
  }
)

export default request
