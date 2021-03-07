import axios from 'axios'
import { removeToken, getToken } from '@/utils/storage'
import store from '@/store'
// import router from '@/router'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})

// 请求拦截器
request.interceptors.request.use(
  function (request) {
    const token = getToken('hm_m_token')
    if (request.needToken) {
      request.headers.authorization = `Bearer ${token}`
    }
    return request
  },
  function (err) {
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    const { code } = response.data
    if (code === 200) {
      return response
    }
    if (code === 400 || code === 401 || code === 403) {
      Toast.fail(response.data.message)
      removeToken()
      store.commit('setIsLogin', false)
      // router.push('/login')
    }
    return Promise.reject(new Error(response.data.message))
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default request
