<template>
  <transition name="fade">
    <div v-if="$store.state.routerViews.registerBlockIsShow" id="RBody">
      <register-block></register-block>
    </div>
  </transition>
</template>

<script>
import RegisterBlock from "components/common/login&register/RegisterBlock";
export default {
  name: "viewsRegister",
  data() {
    return {};
  },
  components: {
    RegisterBlock
  },
  computed: {},
  mounted() {
    this.$store.state.routerViews.registerBlockIsShow = true;
    document.title = this.$route.meta.title;
  }
};
</script>

<style scoped>
@import url("~views/lib/fade.css");
#RBody {
  overflow: hidden;
}
#content {
  display: flex;
  display: flex;
  justify-content: center;
}
</style>
