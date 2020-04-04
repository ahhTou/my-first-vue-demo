import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
Vue.use(Vuex)
const state = {
  login:false,
  loginToken:'',
  userBaseMsg:{
    id:'未登录',
    nickname:'未登录'
  },
  routerViews: {
    loginOrRegisterIsShow:false,
    registerBlockIsShow:false,
    lgoinBlockIsShow:false,
    registerIsShow:false,
    welcomeIsShow: false,
  },
  views: {
    show: false,
    index: 0,
    bg: [{},]
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions: {
  },
  modules: {
  }
})
