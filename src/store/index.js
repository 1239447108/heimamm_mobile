import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoApi } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: null,
    // 底部tabbar是否显示
    isTabbarShow: false
  },
  mutations: {
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    setIsTabbarShow (state, isshow) {
      state.isTabbarShow = isshow
    }
  },
  actions: {
    async getUserInfoByVuex (store) {
      try {
        const { data: res } = await getUserInfoApi()
        store.commit('setUserInfo', res.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
