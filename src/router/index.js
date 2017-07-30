import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import controllerCenter from '@/components/controllerCenter/controller-center'
import systemSet from '@/components/systemSet/systemSet'
import trainPlan from '@/components/trainPlan/trainPlan'

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
    },
    {
      path: '/sys',
      name: 'sys',
      component : systemSet
    },
    {
      path: '/trainPlan',
      name: 'tp',
      component : trainPlan
    }
  ]
})
