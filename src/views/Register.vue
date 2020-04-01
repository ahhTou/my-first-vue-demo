<template>
  <transition name="fade">
    <div v-if="$store.state.routerViews.registerIsShow">
      <body-title>
        <template v-slot:big>Register</template>
      </body-title>
      <div id="content">
        <div id="registerBox">
          <register-block></register-block>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import bodyTitle from "components/main/title";
import RegisterBlock from "components/common/login&register/RegisterBlock";
import commonImg from "components/common/login&register/commonImg";
export default {
  name: "viewsRegister",
  data() {
    return {};
  },
  components: {
    bodyTitle,
    RegisterBlock,
    commonImg
  },
  computed: {},
  mounted() {
    this.$store.state.routerViews.registerIsShow = true;
    document.title = this.$route.meta.title;
  },
};
</script>

<style scoped>
@import url('./lib/fade.css');
#content {
  display: flex;
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>