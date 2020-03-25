<template>
  <div id="all">
    <div id="f">
      <div id="up"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "tC",
};
</script>


<style scoped>
@import "../../../assets/css/base.css";
@import "../../../assets/css/normalize.css";
#up {
  background-color: rgb(189, 208, 207);
  height: 50vh;
  overflow: hidden;
  transform: rotate(10deg) scale(1.5);
}
#f {
  overflow: hidden;
  width: 1920px;
  height: 100vh;
}
#all {
  /* position: fixed; */
  position: absolute;
  top:-300px;
  z-index: -5;
}
</style>