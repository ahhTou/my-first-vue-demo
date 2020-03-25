<template>
    <div id="block" v-float>
      <span id="title">番剧</span>
    </div>
</template>


<script>
export default {
  name: "PlateView",
  directives: {
    float(el) {
      let itDiv = el;
      let oldy, oldx, newx, newy;
      itDiv.onmouseenter = e => {
        oldx = e.pageX;
        oldy = e.pageY;
        document.onmousemove = e => {
          newx = e.pageX;
          newy = e.pageY;
          let mx = oldx - newx;
          let my = oldy - newy;
          itDiv.style.left = mx / 60 + "px";
          itDiv.style.top = my / 60 + "px";
        };
        itDiv.onmouseleave = e => {
          document.onmousemove = null;
          itDiv.style.left = 0 + "px";
          itDiv.style.top = 0 + "px";
        };
      };
    }
  }
};
</script>


<style scoped>
#title{
  font-family: 'Apple LiGothic Medium';
  text-indent: 10px;
  font-size: 3rem;
}
#block {
  position: relative;
  z-index: 1;
  width: 30rem;
  height: 30rem;
  border-radius: 1rem;
  background: url("~assets/img/bg2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 1rem 1rem 2rem #aaa;
  transition: transform 2s;
  padding: 20px;
  /* background-position: -30px -500px ; */
}
#block:hover {
  transform: scale(1.05, 1.05);
}
</style>