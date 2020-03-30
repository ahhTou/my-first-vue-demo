<template>
  <div id="body">
    <span>
      <slot></slot>
    </span>
  </div>
</template>


<script>
export default {
  name: "commonImg"
};
</script>


<style scoped>
#body {
  margin: 10px;
  width: 50vw;
  /* height: 100vw; */
  background: url("http://127.0.0.1:3000/public/img/2.jpg");
  background-size: cover;
  background-position: center;
  /* border-radius: 1vw; */
}
</style>