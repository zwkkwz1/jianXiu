// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import QRCode from 'qrcode'

//import './assets/css/twitter/3.3.7/bootstrap.min.css'
Vue.use(QRCode)
Vue.config.productionTip = false
Vue.use(axios)
Vue.prototype.$http = axios //如何把axios变成全局变量

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
