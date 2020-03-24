import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
