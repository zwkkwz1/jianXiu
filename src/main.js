// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueQriously from 'vue-qriously'
//import 'vue-instant/dist/vue-instant.css'
//import VueInstant from 'vue-instant'
import vueXlsxTable from 'vue-xlsx-table'


Vue.use(vueXlsxTable, {rABS: false})
//import './assets/css/twitter/3.3.7/bootstrap.min.css'
Vue.use(VueQriously)
Vue.config.productionTip = false
//Vue.use(VueInstant)
//Vue.use(axios)
//Vue.prototype.$http = axios //如何把axios变成全局变量

Vue.filter('formatTime', function (value) {
	if (value) {
		let valueArr = value.split(" ");
		let timeArr = valueArr[1].split(":");
		return timeArr[0] + ':' + timeArr[1]
	} else {
		return value
	}
})
Vue.filter('formatPre', function (value) {
  return value*100+'%'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
