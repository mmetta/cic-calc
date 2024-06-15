import Vue from 'vue'
import Vuex from 'vuex'
import modAdmin from './modAdmin'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modAdmin
  }
})
