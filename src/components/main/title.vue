<template>
  <div id="bodyTitle">
    <div id="titleBox">
      <div id="bigTitle">
        <slot name="big"></slot>
      </div>
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
#bodyTitle {
  font-family: "Microsoft YaHei";
  color: white;
}
</style>