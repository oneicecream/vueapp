import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import relativeTime from './filters/realtive-time'
import checkLogin from './utils/check-login'

// 注册 Vant 的图片懒加载自定义指令
Vue.use(Lazyload)

// 注册一个全局过滤器：处理相对时间
Vue.filter('relativeTime', relativeTime)

Vue.use(VeeValidate, {
  // events: 'change'
})

Vue.use(Vant)
Validator.localize('zh-CN', zhCN)

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, time)
  })
}

// 将检查登录状态挂载到 Vue 原型对象上，这样的话任何组件就都可以使用了
Vue.prototype.$checkLogin = checkLogin

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vant,
  render: h => h(App)
}).$mount('#app')
