import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    welcomeIsShow:true,
    views:{
      show:false,
      index:0,
      bg:[
        {},
    ]

    }
  },
  mutations: {
    windowsToTop(){
      var element = document.getElementById("app");
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
