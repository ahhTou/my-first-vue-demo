<template>
  <div id="app">
    <wel-come></wel-come>
    <back-to-top />
    <tow-color-bg />
    <div :class="bgb"></div>
    <div id="bg" :style="{background:'url(' + this.$store.state.views.bg[this.$store.state.views.index].img + ')', position:'fixed', zIndex:-11}"></div>
  </div>
</template>

<script>
import towColorBg from "components/common/twoColorBackGround/bg";
import backToTop from "components/common/backToTop/mian";
import WelCome from "components/WelCome"
export default {
  name: "App",
  data() {
    return {
      bgb:{
        bgb1: true,
        bgb2: false
      }
    }
  },
  components: {
    backToTop,
    towColorBg,
    WelCome
  },
  mounted(){
    if(this.$store.state.views.show){
        this.bgb.bgb2 = true
    }else{
       this.bgb.bgb2 = false
    }
  },
  computed:{
    isShow () {
     return this.$store.state.views.show
    }
  },
  watch:{
    isShow(val){
      this.bgb.bgb2 = val
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
body{
  height: 200vw;
  position: relative;
  background: rgb(238,240,241);

   /* background-size:cover;  
   background-position: 0px -600px; */
}
#bg{
  position: fixed;
  z-index: -11;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  background-size:cover;  
  background-repeat: no-repeat;
  /* background: rgb(238,240,241); */
  /* background-image: url('./assets/img/bg3.jpg'); */
  /* background-image:'~assets/img/bg3.jpg' */
}
.bgb1{
  position: fixed;
  z-index: -8;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  background-size:cover;  
  background-repeat: no-repeat;
  background: rgb(238,240,241);
  opacity: 1;
  transition: all 2s;
}
.bgb2{
  opacity: 0;
}
</style>
