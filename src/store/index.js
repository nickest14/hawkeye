import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)

const isDebugMode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebugMode
Vue.config.devtools = isDebugMode

export default new Vuex.Store({
  state: {
    test: '123',
    user: {
      logined: 'pending',
      account_type: undefined,
      chatInfo: null,
      unsettled: 0
    }
  },
  actions,
  mutations,
  getters
})
