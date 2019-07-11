import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate, {
  // events: 'change'
})
Validator.localize('zh-CN', zhCN)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vant,
  render: h => h(App)
}).$mount('#app')
