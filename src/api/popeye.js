import axios from 'axios'
import qs from 'qs'
import urls from './urls'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + '12312323'

// let axiosChat = axios.create()

function login (user) {
  return axios.post(urls.login, qs.stringify(user))
}

function logout () {
  return axios.post(urls.logout)
}

function register (user) {
  return axios.post(urls.register, qs.stringify(user), { withCredentials: true })
}

function fetchtest (user) {
  return axios.get(urls.test)
}

export {
  login,
  logout,
  register,
  fetchtest
}
