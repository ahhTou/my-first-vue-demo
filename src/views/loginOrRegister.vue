<template>
  <transition name="fade">
    <div v-if="$store.state.routerViews.loginOrRegisterIsShow">
      <body-title>
        <template v-slot:big>{{ lrTitle }}</template>
      </body-title>
      <div id="lorRBox">
        <div id="barAndRouterViewsBody">
          <this-bar>
          </this-bar>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import thisBar from "components/common/login&register/thisBar/mian";
import bodyTitle from "components/main/title";
export default {
  name: "",
  data() {
    return {
      lrTitle:'',
    }
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
    routerName(){
      return this.$route.name;
    }
  },
  watch: {
    routerName(){
      this.lrTitle = this.$route.name;
    }
  },
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