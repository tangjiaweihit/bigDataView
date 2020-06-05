import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/http/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index.js'
import moment from '@/mixin/moment.js'
import cookie from 'js-cookie'
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import echarts from "echarts";
import macarons from '@/common/theme.json'

console.log('macarons-->>>', macarons)
echarts.registerTheme('myMacarons', macarons);
Vue.prototype.$cookie = cookie
Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.mixin(moment)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.component('v-chart', ECharts)
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
