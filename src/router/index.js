import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => require(['@/components/Home'], resolve)
const Menu = (resolve) => require(['@/components/Menu'], resolve)
const User = (resolve) => require(['@/components/user/User'], resolve)
const Login = (resolve) => require(['@/components/Login'], resolve)
const UserDetail = (resolve) => require(['@/components/user/UserDetail'], resolve)
const UserStart = (resolve) => require(['@/components/user/UserStart'], resolve)
const UserEdit = (resolve) => require(['@/components/user/UserEdit'], resolve)

export const routerMap = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    components: {
      default: User
    },
    children: [
      { path: 'start', components: UserStart },
      { path: 'userdetail', component: UserDetail },
      { path: 'useredit', component: UserEdit }
    ]
  }
]

export default new Router({
  routes: routerMap,
  mode: 'history'
})
