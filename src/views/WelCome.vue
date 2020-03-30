<template>
  <div>
    <body-title>
      <template v-slot:big>欢迎来到</template>
      <template v-slot:little>ahhtou的主页</template>
    </body-title>
    <nav-bar></nav-bar>
    <div id="Content">
      <content-plate></content-plate>
    </div>
  </div>
</template>


<script>
import NavBar from "components/common/NavBar/navbar";
import ContentPlate from "components/common/plate/main";
import bodyTitle from "components/main/title";
export default {
  name: "viewsWelCome",
  components: {
    NavBar,
    ContentPlate,
    bodyTitle
  },
  mounted() {
    document.title = this.$route.meta.title;
  }
};
</script>


<style scoped>
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