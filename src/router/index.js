import Vue from 'vue'
import Router from 'vue-router'
import controllerCenter from '@/components/controllerCenter/controller-center'
import systemSet from '@/components/systemSet/systemSet'
import trainPlan from '@/components/trainPlan/trainPlan'
import bunkAdmin from '@/components/bunkAdmin/bunkAdmin'
import bunkExhibition from '@/components/bunkExhibition/bunkExhibition'
import dataQuery from '@/components/dataQuery/dataQuery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'controllerCenter',
      component: controllerCenter
    },
    {
      path: '/sys',
      name: 'sys',
      component : systemSet
    },
    {
      path: '/tp',
      name: 'tp',
      component : trainPlan
    },
    {
      path: '/bunkAd',
      name: 'bunkAdmin',
      component : bunkAdmin
    },
    {
      path: '/bunkEx',
      name: 'bunkExhibition',
      component : bunkExhibition
    },
    {
      path: '/dq',
      name: 'dataQuery',
      component : dataQuery
    }
  ]
})
