import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/account',
    name: 'account',
    component:() => import("views/loginOrRegister"),
    redirect:'/404',
    children: [
      {
        path: '/account/register',
        name: 'register',
        component: () => import("components/main/account/Register.vue"),
        meta: {
          title: '注册'
        },
      },
      {
        path: '/account/login',
        name: 'login',
        component: () => import("components/main/account/Login"),
        meta: {
          title: '登录'
        },
      }

    ]
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
    path:'/404',
    name:'err404',
    component:() => import("views/other/404"),
    meta:{
      title:'404'
    }
  }

]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
