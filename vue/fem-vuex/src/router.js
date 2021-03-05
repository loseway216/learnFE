import Vue from 'vue'
import Router from 'vue-router'

import Vending from './components/VendingMachineAdmin'
import Login from './components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Vending',
      component: Vending
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})

export default router
