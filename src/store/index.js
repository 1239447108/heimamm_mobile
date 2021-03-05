import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: null,
    // 登录之前的地址
    prevUrl: '',
    isTabbarShow: false
  },
  mutations: {
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    setPrevUrl (state, url) {
      state.prevUrl = url
    },
    setIsTabbarShow (state, isshow) {
      state.isTabbarShow = isshow
    }
  },
  actions: {
  },
  modules: {
  }
})
