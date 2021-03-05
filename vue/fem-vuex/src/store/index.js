import Vue from 'vue'
import Vuex from 'vuex'
import inventory from './module/inventory'
import machine from './module/machine'
import locale from './module/locale'
import persistLang from '../plugins/persist-lang'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistLang],
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    inventory,
    machine,
    locale
  }
})
