import Back from '@/components/back'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

const backPlugin = {}

// Vue.use(插件)就相当于调用了插件的install方法
backPlugin.install = function (Vue) {
  // 将返回的tabbar注册为全局组件
  Vue.component('back', Back)
  // dayjs部分
  // 配置使用处理相对时间的插件
  dayjs.extend(relativeTime)

  // 配置使用中文语言包
  dayjs.locale('zh-cn')

  // 全局过滤器：处理相对时间
  Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
  })
}

export default backPlugin
