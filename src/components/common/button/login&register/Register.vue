<template>
  <div id="body2">
    <div id="btn">
      <span id="span1">+</span>
      <span id="span2">注册</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "btnRegister"
};
</script>


<style scoped>
#body2 {
  float: left;
  font-size: 17px;
  width: 170px;
  height: 100px;
  display: flex;
  align-items: center;
  transition: all 0.5s;
}
#btn {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background: rgb(96, 174, 64);
  font-family: "Microsoft YaHei";
  letter-spacing: 10px;
  text-indent: 10px;
  color: white;
  box-shadow: 2px 2px 5px #aaa;
  transition: all 0.5s;
  transform-origin: 0% 50%;
}
#btn:hover {
  transform-origin: 0% 50%;
  /* background: rgb(214, 238, 0); */
  width: 140px;
  cursor:pointer;
}
#span1 {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#span2 {
  transition: all 1s;
  position: relative;
  bottom: 60px;
  width: 140px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}
#btn:hover #span2 {
  opacity: 1;
}
</style>