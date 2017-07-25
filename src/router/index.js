import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import controllerCenter from '@/components/controllerCenter/controller-center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/controller',
      name: 'controllerCenter',
    	component: controllerCenter
    }
  ]
})
