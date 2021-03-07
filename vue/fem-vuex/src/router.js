import Vue from 'vue'
import Router from 'vue-router'

import Vending from './components/VendingMachineAdmin'
import Login from './components/Login'

import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Vending',
      component: Vending,
      // 下面两种二选一
      // beforeEnter(to, from, next) {
      //   if (store.getters.isLoggedIn) {
      //     next()
      //   } else {
      //     next('/login')
      //   }
      // },
      meta: { authRequired: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.authRequired)
  if (authRequired) {
    console.log(store.state.user)
    if (store.getters['isLoggedIn']) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
