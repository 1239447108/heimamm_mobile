import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vant全部引入
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入自制插件
import myPlugin from '@/utils/plugins/myFirstPlugin'

// 引入插件解决移动端rem的问题
import 'amfe-flexible'
import 'normalize.css'
// 引入iconfont
import '@/styles/iconfont/iconfont.css'

Vue.use(Vant)
Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(myPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
