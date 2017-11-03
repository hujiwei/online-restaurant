import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import ordering from '@/components/ordering'
import mine from '@/components/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/ordering',
      name: 'ordering',
      component: ordering
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    }
  ]
})
