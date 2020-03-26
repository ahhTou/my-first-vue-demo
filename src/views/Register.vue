<template>
  <div>
    <h1>注册</h1>
  </div>
</template>


<script>
export default {
  name: "viewsRegister",
  mounted() {
    console.log("???");

    document.title = this.$route.meta.title;
  },
};
</script>


<style scoped>
</style>