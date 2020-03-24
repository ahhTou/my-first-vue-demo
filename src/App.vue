<template>
  <div id="app">
    <user-hatch></user-hatch>
    <tow-color-bg />
    <back-to-top />
    <btn-log-reg />
  </div>
</template>

<script>
import UserHatch from "components/common/UserHatch/UserHatch";
import towColorBg from "components/common/twoColorBackGround/bg.vue";
import backToTop from "./components/common/backToTop/mian";
import BtnLogReg from "./components/common/button/login&register/mian";
export default {
  name: "App",
  components: {
    backToTop,
    UserHatch,
    towColorBg,
    BtnLogReg
  }
};
</script>

<style>
@import "./assets/css/base.css";
@import "./assets/css/normalize.css";
body{
  height: 100vw;
}
</style>
