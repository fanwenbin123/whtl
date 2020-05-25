import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/index.scss'
import '@/utils/vant'
//import vConsole from './vconsole.js'


import FastClick from 'fastclick'
FastClick.attach(document.body)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
