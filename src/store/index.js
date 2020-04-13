import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  login:false,
  loginToken: null,
  userBaseMsg:{
    id:'未登录',
    nickname:'未登录',
    gender:'未指定',
  },
  routerViews: {
    loginOrRegisterIsShow:false,
    registerBlockIsShow:false,
    lgoinBlockIsShow:false,
    registerIsShow:false,
    welcomeIsShow: false,
    profileIsSHow:false,

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
  getters,
  actions: {
  },
  modules: {
  }
})
