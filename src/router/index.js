import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login.vue'
import Index from '@/components/index/Index.vue'
import homeRoute from '@/components/homeRoute/index.vue'
import forgetPwd from '@/components/login/forgetPwd.vue'
import ScreenDetect from '@/components/vision/ScreenDetect.vue'
import eyesBalance from '@/components/vision/eyesBalance.vue'
import TrainIframe from '@/components/vision/TrainIframe.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/forgetPwd',
      component: forgetPwd
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: 'homeRoute',
          component: homeRoute,
          props: true
        },
        {
          path: 'resolution',
          component: ScreenDetect,
          props: true
        },
        {
          path: 'balance',
          component: eyesBalance,
          props: true
        },
        {
          path: 'vision',
          component: TrainIframe,
          props: true
        },
        // {
        //   path: 'questionIframe',
        //   component: questionIframe,
        //   props: true
        // },
      ]
    },
  ]
})
