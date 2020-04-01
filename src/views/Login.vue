<template>
  <div>
    <body-title>
      <template v-slot:big>Login</template>
    </body-title>
  </div>
</template>


<script>
import bodyTitle from "components/main/title";
export default {
  name: "viewsLogin",
  components: {
    bodyTitle
  },
  mounted() {
    document.title = this.$route.meta.title;
  }
};
</script>

<style scoped>
</style>