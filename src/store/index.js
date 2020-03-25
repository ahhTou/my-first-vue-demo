import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    views:{
      show:false,
      index:0,
      bg:[
        {},
        {img:require("assets/img/bg3.jpg")}
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
