<template>
  <transition name="fade">
    <div v-if="$store.state.routerViews.lgoinBlockIsShow" id="LBody">
      <login-block></login-block>
    </div>
  </transition>
</template>


<script>
import LoginBlock from "components/common/login&register/LoginBlock";
export default {
  name: "viewsLogin",
  components: {
    LoginBlock
  },
  mounted() {
    this.$store.state.routerViews.lgoinBlockIsShow = true;
    document.title = this.$route.meta.title;
  }
};
</script>

<style scoped>
@import url("~views/lib/fade.css");
#LBody {
  overflow: hidden;
}
</style>