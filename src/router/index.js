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
      name: '控制中心',
      component: controllerCenter
    },
    {
      path: '/sys',
      name: '系统设置',
      component : systemSet
    },
    {
      path: '/tp',
      name: '计划维护',
      component : trainPlan
    },
    {
      path: '/bunkAd',
      name: '铺位管理',
      component : bunkAdmin
    },
    {
      path: '/bunkEx',
      name: '铺位看板',
      component : bunkExhibition
    },
    {
      path: '/dq',
      name: '历史查询',
      component : dataQuery
    }
  ]
})
