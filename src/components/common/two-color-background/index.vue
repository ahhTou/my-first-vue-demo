<template>
  <div id="all">
    <div id="f">
      <div id="up"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tC'
}
</script>

<style scoped>
@import '../../../assets/css/base.css';
@import '../../../assets/css/normalize.css';
#up {
  background-color: rgba(189, 208, 207, 0.8);
  height: 50vh;
  overflow: hidden;
  transform: rotate(10deg) scale(1.5);
}
#f {
  width: 100vw;
  height: 100vh;
}
#all {
  position: absolute;
  top: -30vh;
  z-index: -5;
  overflow: hidden;
}
</style>
