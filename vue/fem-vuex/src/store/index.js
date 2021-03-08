import Vue from 'vue'
import Vuex from 'vuex'
import inventory from './module/inventory'
import machine from './module/machine'
import locale from './module/locale'
import persistLang from '../plugins/persist-lang'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistLang],
  state: { user: null },
  getters: {
    isLoggedIn(state) {
      return !!state.user
    }
  },
  actions: {
    login({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('logUser', { name: 'admin', id: '123' })
          resolve('user created')
        }, 500)
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('logUser', null)
          resolve('user logged out')
        }, 500)
      })
    }
  },
  mutations: {
    logUser(state, payload) {
      state.user = payload
    }
  },
  modules: {
    inventory,
    machine,
    locale
  }
})
