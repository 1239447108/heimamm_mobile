import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import myPlugin from '@/utils/plugins/myFirstPlugin'
// 引入dayjs
import './utils/dayjs'

import 'amfe-flexible'
import 'normalize.css'
import '@/styles/iconfont/iconfont.css'

Vue.use(Vant)
Vue.config.productionTip = false

Vue.use(myPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
