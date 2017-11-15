import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import ordering from '@/components/ordering'
import cart from '@/components/cart'
import pay from '@/components/pay'
import mine from '@/components/mine'
import recharge from '@/components/recharge'
import orderlist from '@/components/orderlist'
import order from '@/components/order'
import about from '@/components/about'

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
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: orderlist
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
  ]
})
