<template>
    <div id='wrapper' class="wrapper"  @click="changeShow" v-if="isShow">
      <span > 啦啦啦</span>
    </div>
</template>


<script>
export default {
  name: "toast",
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    changeShow(event) {
      document.getElementById("wrapper").classList.add();
    }
  },
};
</script>
<style scoped>
@import url("./lib/pc.css") screen and (min-width: 768px);
@import url("./lib/mobile.css") screen and (max-width: 768px);
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 10px 20px #aaa;
  transition: all 0.5s;
}
.wrapper:hover {
  transform: translateX(-50%) scale(1.05);
}
.ani{
   transform: translateX(-50%) scale(1.05);
}

</style>