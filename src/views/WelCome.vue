<template>
  <transition name="fade" mode="out-in">
    <div v-if="$store.state.routerViews.welcomeIsShow" id="welBody">
      <body-title>
        <template v-slot:big>Hi~</template>
        <template v-slot:little>{{ username }}</template>
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
  data() {
    return {
      username: "请登录"
    };
  },
  components: {
    ContentPlate,
    bodyTitle,
    NavBar
  },
  computed: {
    userBaseMsg() {
      this.username = this.$store.state.userBaseMsg.nickname;
      if (this.username == null || this.username == "") {
        this.username = "请登录";
      }
      return this.$store.state.userBaseMsg.nickname;
    }
  },
  watch: {
    userBaseMsg(val) {
      this.username = val;
    }
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
#welBody {
  overflow: hidden;
}
#Content {
  display: flex;
  justify-content: center;
}
</style>
