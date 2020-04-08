<template>
  <div
    id="wrapper"
    title="点击我隐藏提示框"
    :class="wrapper"
    @click="changeShow(true)"
    v-if="isShow"
    @mouseenter="toNotExit"
  >
    <span>{{ message }}</span>
  </div>
</template>


<script>
export default {
  name: "toast",
  data() {
    return {
      isShow: true,
      wrapper: {
        ani1: false,
        ani2: true
      },
      notExit: false,
      alive: true,
      forceClick: false
    };
  },
  methods: {
    toNotExit() {
      this.notExit = true;
    },
    changeShow(force) {
      if (force) {
        this.notExit = false;
        this.forceClick = true;
      }
      if (!this.notExit) {
        this.wrapper.ani1 = true;
        this.wrapper.ani2 = false;
        setTimeout(() => {
          this.wrapper.ani1 = false;
          this.isShow = false;
          this.notExit = false;
        }, 400);
      }
    },
    changeInstance(callback) {
      if (this.forceClick) {
        if (this.alive) {
          this.forceClick = false;
          callback();
        }
      }
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.alive = true;
        this.wrapper.ani1 = false;
        this.wrapper.ani2 = true;
      }
    }
  }
};
</script>
<style scoped>
@import url("./lib/pc.css") screen and (min-width: 768px);
@import url("./lib/mobile.css") screen and (max-width: 768px);
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 3%;
  left: 50%;
  transform: translateX(-50%) translateY(0%) scale(1);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 10px 20px #aaa;
  transition: all 0.3s;
}
#wrapper:hover {
  transform: translateX(-50%) translateY(0%) scale(1.05);
}
.ani1 {
  animation: go 0.5s;
}
.ani2 {
  animation: in 0.5s;
}
@keyframes go {
  0% {
    transform: translateX(-50%) translateY(0%) scale(1);
  }
  100% {
    transform: translateX(-50%) translateY(-200%) scale(1);
  }
}
@keyframes in {
  0% {
    transform: translateX(-50%) translateY(-200%) scale(1);
  }
  100% {
    transform: translateX(-50%) translateY(0%) scale(1);
  }
}
</style>