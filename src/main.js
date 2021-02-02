import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import locale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import Vue18n from 'vue-i18n' //多语言
Vue.use(Vue18n)
const i18n = new Vue18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': Object.assign(require('./lang/cn'),locale),   // 中文语言包
      'en-US': Object.assign(require('./lang/en'),enLocale),    // 英文语言包
    }
})
import {setCookie,getCookie,delCookie} from '@/utils/cookie'//cookie
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vant)

// 配置NProgress选项
// NProgress.configure({ })
// 在路由页面跳转使用
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 继续路由
  next()
})
router.afterEach(transition => {
  // 结束进度条
  NProgress.done()
})

//提示框只显示一个的封装
const showMessage = Symbol('showMessage')
class DonMessage {
  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }
  info(options, single = true) {
    this[showMessage]('info', options, single)
  }
  error(options, single = true) {
    this[showMessage]('error', options, single)
  }
  [showMessage](type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName('el-message').length === 0) {
        Message[type](options)
      }
    } else {
      Message[type](options)
    }
  }
}

import '@/icons' // svg

Vue.prototype.$message = new DonMessage()

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
