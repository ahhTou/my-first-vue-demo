<template>
  <div id="bodyTitle">
    <div id="title">
      <slot name="big"></slot>
      <div id="littleTitle">
        <slot name="little"></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "bodytitle"
};
</script>


<style scoped>
@import url("./lib/pc.css") screen and (min-width: 768px);
@import url("./lib/mobile.css") screen and (max-width: 768px);
#title {

  font-family: "Microsoft YaHei";
  color: white;
}
#bodyTitle {
  display: inline-block;

}
#littleTitle {
  position: relative;
}
</style>