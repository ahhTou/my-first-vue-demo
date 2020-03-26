<template>
  <div id="body">
    <nav-bar></nav-bar>
    <div id="bodyTitle">
      <div id="title">
        欢迎来到
        <div id="littleTitle">ahhTou的主页</div>
      </div>
    </div>
    <div id="Content">
      <content-plate></content-plate>
    </div>
  </div>
</template>


<script>
import NavBar from "components/common/NavBar/navbar";
import ContentPlate from "components/common/plate/main";
export default {
  name: "WelCome",
  components: {
    NavBar,
    ContentPlate
  },
  mounted() {
    document.title = this.$route.meta.title;
  }
};
</script>


<style scoped>
#title {
  font-size: 10rem;
  color: white;
  letter-spacing: 100px;
  /* text-indent: 10px; */
  float: right;
}
#bodyTitle {
  width: 1920px;
  display: inline-block;
  padding-bottom: 50px;
}
#littleTitle {
  font-size: 3rem;
  letter-spacing: 10px;
  margin-top: 20px;
  position: relative;
  left: 530px;
}
#Content {
  display: flex;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}
</style>