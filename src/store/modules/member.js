import Vue from 'vue'
import axios from 'axios'
import * as types from '../types'
import { login } from '@/api'
const state = {
  counter: 999
}

const getters = {
  [types.DOUBLE_COUNTER]: state => {
    return state.counter * 2
  },
  [types.CLICK_COUNTER]: state => {
    return state.counter + ' Clicks'
  }
}

const mutations = {
  [types.MUTATE_INCREMENT_COUNTER]: (state, payload) => {
    state.counter += payload
  },
  [types.MUTATE_DECREMENT_COUNTER]: (state, payload) => {
    state.counter -= payload
  }
}

const actions = {
  [types.LOGIN]: ({ commit, state, dispatch }, { user }) => {
    return login(user).then(res => {
      console.log(res)
      var data = res.data
      console.log(data)
      if (data.token) {
        let expires = new Date(data.exp)
        localStorage.setItem('token_expire', expires)
        localStorage.setItem('jwt_token', data.token) // for monitoring in App.vue
        Vue.cookie.set('jwt_token', data.token, {
          expires: expires
        })
        axios.defaults.withCredentials = true
        axios.defaults.headers.common['Authorization'] = 'jwt' + ' ' + data.token
      }
    }, error => {
      return Promise.reject(error)
    })
  },

  [types.COUNTER_INCREMENT]: ({ commit }, payload) => {
    commit(types.MUTATE_INCREMENT_COUNTER, payload)
  },
  [types.COUNTER_DECREMENT]: ({ commit }, payload) => {
    commit(types.MUTATE_DECREMENT_COUNTER, payload)
  },
  [types.COUNTER_INCREMENT_ASYNC]: ({ commit }, payload) => {
    setTimeout(() => {
      commit(types.MUTATE_INCREMENT_COUNTER, payload.by)
    }, payload.duration)
  },
  [types.COUNTER_DECREMENT_ASYNC]: ({ commit }, payload) => {
    setTimeout(() => {
      commit(types.MUTATE_DECREMENT_COUNTER, payload.by)
    }, payload.duration)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
