import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import("views/Register"),
    meta: {
      title: '注册'
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import("views/WelCome"),
    meta: {
      title: '主页'
    },
  },
  {
    path:'/login',
    name: 'login',
    component: () => import("views/Login"),
    meta: {
      title: '登录'
    },
  }
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
