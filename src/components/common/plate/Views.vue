<template>
  <div id="block" :style="style" v-float @mouseenter="f1" @mouseleave="f2" @click="goto">
    <span id="title1">
      <slot name="title"></slot>
    </span>
  </div>
</template>


<script>
export default {
  name: "PlateView",
  props: ["data1"],
  data() {
    return {
      // imgUrl
      style: {}
    };
  },
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
          itDiv.style.left = mx / 20 + "px";
          itDiv.style.top = my / 20 + "px";
        };
        itDiv.onmouseleave = e => {
          document.onmousemove = null;
          itDiv.style.left = 0 + "px";
          itDiv.style.top = 0 + "px";
        };
      };
    }
  },
  methods: {
    f1() {
      try{
        this.$store.state.views.index = this.data1.index;
        this.$store.state.views.show = true;
      }catch(err){
      }
    },
    f2() {
      this.$store.state.views.show = false;
    },
    goto() {
      window.open(
        "https://www.bilibili.com/anime/?spm_id_from=333.851.b_7072696d6172794368616e6e656c4d656e75.7",
        "_self"
      );
    }
  },
  watch: {
    data1() {
      this.style = {
        background: "url(" + this.data1.img + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    }
  }
};
</script>


<style scoped>
@import url("./lib/pc.css") screen and (min-width: 768px);
@import url("./lib/mobile.css") screen and (max-width: 768px);
#title1 {
  text-indent: 10px;
  font-size: 50px;
  padding: 10px;
}
#block {
  position: relative;
  z-index: 1;
  transition: transform 2s;
  cursor: none;
}
#block:hover {
  transform: scale(1.05, 1.05);
}
</style>