import Vue from 'vue'
import Vuex from 'vuex'
import member from './modules/member'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    value: 555,
    hiiii: 123
  },
  getters,
  mutations,
  actions,
  modules: {
    member
  }
})
