import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

export default function () {
  if (!store.state.isLogin) {
    const path = window.location.hash.split('#')[1]
    Toast.fail('您还没有登录哦~')
    router.push('/login?redirect=' + path)
    return false
  }
  return true
}
