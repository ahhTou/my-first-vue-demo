<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="$store.state.routerViews.loginOrRegisterIsShow" id="lorBody">
        <body-title>
          <template v-slot:big>{{ lrTitle }}</template>
        </body-title>
        <div id="lorRBox">
          <div id="barAndRouterViewsBody">
            <this-bar></this-bar>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import thisBar from "components/common/login&register/thisBar/mian";
import bodyTitle from "components/main/title";
export default {
  name: "",
  data() {
    return {
      lrTitle: ""
    };
  },
  components: {
    thisBar,
    bodyTitle
  },
  mounted() {
    this.$store.state.routerViews.loginOrRegisterIsShow = true;
    this.lrTitle = this.$route.name;
    this.barTitle = this.$route.meta.title;
  },
  computed: {
    routerName() {
      return this.$route.name;
    }
  },
  watch: {
    routerName() {
      this.lrTitle = this.$route.name;
    }
  }
};
</script>

<style scoped>
@import url("./lib/fade.css");
#lorRBox {
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
