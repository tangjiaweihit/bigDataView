import Vue from 'vue'
import App from './App'
import router from './router'
import VisionUI from 'yotta-vue-components/vision-ui-plugin.js'
import http from '@/http/index.js'
import ElementUI from 'element-ui'
import '@/css/element-variables.scss'
import store from '@/store/index.js'
import moment from '@/mixin/moment.js'
import filtersNum from '@/filters/filtersNum.js'
import cookie from 'js-cookie'
Vue.prototype.$cookie = cookie
Vue.use(filtersNum);
Vue.use(ElementUI)
Vue.use(VisionUI)
Vue.prototype.$http = http
Vue.mixin(moment)
Vue.config.productionTip = false
Vue.prototype.$resourceUrl = 'http://vision-resource.yottasystem.com'
Vue.prototype.$resourceLegacyUrl = 'http://vision-resource-legacy.yottasystem.com'
Vue.prototype.$trainUrl = 'http://vision-train.yottasystem.com'

if (window.location.host.indexOf('mumuqing.net') > -1) {
  console.log('is mumuqing')
  Vue.prototype.$resourceUrl = 'https://vision-resource.mumuqing.net'
  Vue.prototype.$resourceLegacyUrl = 'https://vision-resource-legacy.mumuqing.net'
  Vue.prototype.$trainUrl = 'https://vision-train.mumuqing.net'
}

// import VueElectron from 'vue-electron'
// Vue.use(VueElectron)

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
