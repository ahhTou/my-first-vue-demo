<template>
  <div id="errBody">
    <h1>404</h1>
  </div>
</template>


<script>
export default {
  name: "err404",
  mounted() {
    document.title = this.$route.meta.title;
  }
};
</script>


<style scoped>
#errBody{
  width: max-content;
  height: max-content;
}
</style>