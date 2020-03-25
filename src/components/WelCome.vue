<template>
  <div>
    <div id="bodyTitle">
      <nav-bar></nav-bar>
      <div id="title">
        欢迎来到
        <div id="littleTitle">ahhTou的主页</div>
      </div>
    </div>
    <div id="Content">
      <div id="span" @mouseenter="f1" @mouseleave="f2">
        <content-plate></content-plate>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "components/common/NavBar/navbar";
import ContentPlate from "components/common/plate/Views";
export default {
  name: "WelCome",
  components: {
    NavBar,
    ContentPlate
  },
  methods: {
    f1() {
      this.$store.state.views.index = 1;
      this.$store.state.views.show = true;
    },
    f2() {
      this.$store.state.views.index = 0;
      this.$store.state.views.show = false;
    }
  }
};
</script>


<style scoped>
#title {
  font-size: 10rem;
  color: white;
  letter-spacing: 100px;
  text-indent: 10px;
  float: right;
}
#bodyTitle {
  width: 1920px;
  /* height: 100px; */
  display: inline-block;
}
#littleTitle {
  font-size: 3rem;
  letter-spacing: 10px;
  margin-top: 20px;
  position: relative;
  left: 530px;
}
#Content {
  padding: 100px 200px 10px 200px;
}
#span {
  width: 30rem;
  height: 30rem;
  position: relative;
  /* z-index: 1; */
  /* background: olive; */
}
</style>