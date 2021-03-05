import axios from 'axios'
import { removeToken, getToken } from '@/utils/storage'
import store from '@/store'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    if (getToken('hm_m_token')) {
      config.headers.authorization = `Bearer ${getToken('hm_m_token')}`
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (config) {
    // 如果状态码不为200
    if (config.status !== 200) {
      removeToken()
      store.commit('setIsLogin', false)
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default request
