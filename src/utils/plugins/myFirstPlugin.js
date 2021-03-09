import Back from '@/components/back'

const backPlugin = {}

// Vue.use(插件)就相当于调用了插件的install方法
backPlugin.install = function (Vue) {
  Vue.component('back', Back)
}

export default backPlugin
