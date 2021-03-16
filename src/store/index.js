import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoApi } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    // 用户信息
    userInfo: null,
    questionInfo: null
  },
  mutations: {
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    setQuestionInfo (state, payload) {
      state.questionInfo = payload
    }
  },
  actions: {
    // 获取用户信息
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
  },
  getters: {
    isActive (state) {
      return (prop, id) => {
        return state.userInfo && state.userInfo[prop].includes(id)
      }
    }
  }
})
