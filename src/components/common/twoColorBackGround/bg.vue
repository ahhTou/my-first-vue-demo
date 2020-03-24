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
  height: 30vh;
  overflow: hidden;
  transform: rotate(-10deg) scale(1.5);
}
#f {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
#all {
  /* position: fixed; */
  position: absolute;
  top:-100px;
  z-index: -10;
}
</style>