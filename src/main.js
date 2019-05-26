import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import router from './router'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Vuelidate from 'vuelidate'
import { store } from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './registerServiceWorker'
import './plugins/element.js'

import 'bootstrap'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/scss/bootstrap.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuelidate)
Vue.use(VueCookie)

const token = Vue.cookie.get('jwt_token')
console.log(token)
// if (token) {
//   axios.defaults.withCredentials = true
//   axios.defaults.headers.common['Authorization'] = 'jwt' + ' ' + token
//   store.dispatch('fetchUser').then(() => {})
// } else {
//   Vue.nextTick(() => {
//     store.commit('RESET_USER')
//   })
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
