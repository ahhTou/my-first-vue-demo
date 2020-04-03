<template>
  <div id="app">
    <button @click="fff" id="fff" v-if="!isLogin">退出</button>
    <tow-color-bg />
    <router-view></router-view>
    <back-to-top />
    <div :class="bgb"></div>
    <div
      id="bg"
      :style="{background:'url(' + this.$store.state.views.bg[this.$store.state.views.index] + ')', position:'fixed', zIndex:-11}"
    ></div>
  </div>
</template>

<script>
import towColorBg from "components/common/twoColorBackGround/bg";
import backToTop from "components/common/backToTop/mian";
export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      bgb: {
        bgb1: true,
        bgb2: false
      },
      imgIndex: 0
    };
  },
  methods: {
    fff() {
      window.localStorage.setItem("token", "");
      window.localStorage.setItem("login", false);
      window.localStorage.setItem("rememberMe", false);
    }
  },
  components: {
    backToTop,
    towColorBg
  },
  computed: {
    isShow() {
      return this.$store.state.views.show;
    }
  },
  mounted() {
    if( window.localStorage.getItem("rememberMe")==='true'){
      this.$store.commit("addLoginToken", window.localStorage.getItem("token"))
      this.$store.commit("setLogin", window.localStorage.getItem("login"));
    }
  },
  destroyed() {
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("login", false);
  },
  watch: {
    isShow(val) {
      this.bgb.bgb2 = val;
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
#fff {
  position: relative;
  z-index: 100000;
}
body {
  position: relative;
  background: rgb(238, 240, 241);
}
#bg {
  position: fixed;
  z-index: -11;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  filter: blur(3px);
  background-size: cover;
  background-repeat: no-repeat;
}
.bgb1 {
  position: fixed;
  z-index: -8;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  background-size: cover;
  background-repeat: no-repeat;
  background: rgb(238, 240, 241);
  opacity: 1;
  transition: all 2s;
}
.bgb2 {
  opacity: 0;
}
</style>
