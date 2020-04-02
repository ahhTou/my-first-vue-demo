<template>
  <transition name="fade" mode="out-in">
    <div v-if="$store.state.routerViews.welcomeIsShow">
      <body-title>
        <template v-slot:big>Hi~</template>
        <template v-slot:little>ahhtou</template>
      </body-title>
      <nav-bar></nav-bar>

      <div id="Content">
        <content-plate></content-plate>
      </div>
    </div>
  </transition>
</template>


<script>
import NavBar from "components/common/NavBar/navbar";
import ContentPlate from "components/common/plate/main";
import bodyTitle from "components/main/title";
export default {
  name: "viewsWelCome",
  components: {
    ContentPlate,
    bodyTitle,
    NavBar
  },
  mounted() {
    this.$store.state.routerViews.welcomeIsShow = true;
    document.title = this.$route.meta.title;
  },
  destroyed() {
    this.$store.state.routerViews.welcomeIsShow = false;
  }
};
</script>


<style scoped>
@import url("./lib/fade.css");
#Content {
  display: flex;
  justify-content: center;
}
</style>