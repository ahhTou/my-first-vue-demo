<template>
  <div id="block" :style="style" v-float @mouseenter="f1" @mouseleave="f2" @click="goto">
    <span id="title">
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
          itDiv.style.left = mx / 40 + "px";
          itDiv.style.top = my / 40 + "px";
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
      this.$store.state.views.index = this.data1.index;
      this.$store.state.views.show = true;
    },
    f2() {
      this.$store.state.views.show = false;
    },
    goto(){
      window.open('https://www.bilibili.com/anime/?spm_id_from=333.851.b_7072696d6172794368616e6e656c4d656e75.7','_self')
    }
  },
  watch: {
    data1() {
      this.style = {
        background: "url(" + this.data1.img + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontSize: "4rem"
      };
    }
  }
};
</script>


<style scoped>
#title {
  font-family: "Apple LiGothic Medium";
  text-indent: 10px;
}
#block {
  position: relative;
  z-index: 1;
  width: 30rem;
  height: 30rem;
  border-radius: 1rem;
  box-shadow: 1rem 1rem 2rem #aaa;
  transition: transform 2s;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
}
#block:hover {
  transform: scale(1.05, 1.05);
}
</style>