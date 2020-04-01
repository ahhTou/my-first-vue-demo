import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
Vue.use(Vuex)
const state = {
  routerViews: {
    welcomeIsShow: false,
    registerIsShow: false
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
