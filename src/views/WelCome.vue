<template>
  <transition name="fade" mode="out-in">
    <div v-if="$store.state.routerViews.welcomeIsShow">
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
import { getAccountBaseMsg } from "network/accountMsg";
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
      console.log("改变了：", val);
      this.username = val;
    }
  },
  mounted() {
    this.$store.state.routerViews.welcomeIsShow = true;
    document.title = this.$route.meta.title;
  },
  destroyed() {
    this.$store.state.routerViews.welcomeIsShow = false;
  },
  created() {
    if (window.localStorage.getItem("login") === "true") {
      const token = window.localStorage.getItem("token");
      getAccountBaseMsg().then(result => {
        if (result.data !== "err") {
          this.$store.commit("getuserBaseMsg", result.data);
          console.log(result);
          console.log(window.localStorage.getItem("login"));
        }
        else{
          this.$store.commit('closeLogin');
        }
      });
    }
    console.log(this.$store.state.login)
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