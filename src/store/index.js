import Vue from 'vue'
import Vuex from 'vuex'
import address from './address'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    address
  }
})
