'use strict'

const config = require('../../config')
const env = process.env.NODE_ENV === 'development' ? config.dev.env : config.build.env
const host = env.HOST.replace(/"/g, '')
const account = host + 'account/'

export default {
  login: host + 'login/',
  logout: account + 'logout/',
  register: account + 'register/',
  test: account + 'test/'
}
