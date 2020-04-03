import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/account',
    name: 'account',
    component: () => import("views/loginOrRegister"),
    redirect: '/404',
    children: [
      {
        path: '/account/register',
        name: 'register',
        component: () => import("components/main/account/Register.vue"),
        meta: {
          title: '注册',
          type: 'noLogin',
        },
      },
      {
        path: '/account/login',
        name: 'login',
        component: () => import("components/main/account/Login"),
        meta: {
          title: '登录',
          type: 'noLogin',
        },
      }

    ]
  },

  {
    path: '/',
    name: 'Home',
    component: () => import("views/WelCome"),
    meta: {
      title: '主页',
      noKeepAlive:true,
    },
  },
  {
    path: '/404',
    name: 'err404',
    component: () => import("views/other/404"),
    meta: {
      title: '404'
    }
  }

]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  if (type === 'noLogin') {
    if(window.localStorage.getItem('login')==='true'){
      console.log(window.localStorage.getItem('login'))
      store.state.routerViews.welcomeIsShow = true;
      next('/')
    }
    else next()
  }
  else next()
 
})

export default router
