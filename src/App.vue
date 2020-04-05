<template>
  <div id="app">
    <router-view />
    <back-to-top />
    <tow-color-bg />
    <div :class="bgMask" />
    <user-hatch v-show="$store.state.login" />
    <div id="theTouchBg" :style="theTouchBgStyle" />
  </div>
</template>

<script>
import towColorBg from "components/common/twoColorBackGround/bg";
import backToTop from "components/common/backToTop/mian";
import UserHatch from "components/common/UserHatch/UserHatch";
import { getAccountBaseMsg } from "network/accountMsg";
export default {
  name: "App",
  components: {
    backToTop,
    towColorBg,
    UserHatch
  },
  data() {
    return {
      theTouchBgStyle: { position: "fixed", zIndex: -11 },
      bgMask: { bgb1: true, bgb2: false },
      index: ""
    };
  },
  mounted() {
    const key = window.localStorage.getItem("rememberMe");
    const token = window.localStorage.getItem("token");
    const login = window.localStorage.getItem("login");
    if (key === "true") this.$store.commit("setLogin", { login, token });
  },
  destroyed() {
    const key = window.localStorage.getItem("rememberMe");
    if (key === "false") this.$store.commit("closeLogin");
  },
  computed: {
    isShow() {
      return this.$store.state.views.show;
    },
    isIndex() {
      return this.$store.state.views.index;
    }
  },
  watch: {
    isShow(val) {
      this.bgMask.bgb2 = val;
    },
    isIndex(val) {
      this.theTouchBgStyle.background =
        "url(" + this.$store.state.views.bg[val] + ")";
    }
  },
  created() { 
    if (window.localStorage.getItem("login") === "true") {
      const token = window.localStorage.getItem("token");
      getAccountBaseMsg().then(result => {
        if (result.data !== "err") {
          this.$store.commit("setUserBaseMsg", result.data);
        } else {
          this.$store.commit("closeLogin");
        }
      });
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
body {
  position: relative;
  background: rgb(238, 240, 241);
}
#theTouchBg {
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
