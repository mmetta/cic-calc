import Vue from 'vue'
import Vuex from 'vuex'
import modAdmin from './modAdmin'
import modLogin from './modLogin'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modAdmin,
    modLogin
  }
})
