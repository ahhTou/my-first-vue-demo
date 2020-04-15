<template>
  <div id="wrap" :class="anmClass" @click="goHome">
    <img src="~assets/svg/ant-design/home.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'homeBtn',
  data() {
    return {
      anmClass: {
        biger: false,
        shake: false
      }
    }
  },
  methods: {
    goHome() {
      console.log()
      if (this.$route.path !== '/') {
        this.anmClass.biger = true
        this.$router.push('/')
        setTimeout(() => {
          this.anmClass.biger = false
        }, 600)
      } else {
        this.anmClass.shake = true
        setTimeout(() => {
          this.anmClass.shake = false
        }, 600)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/normal';
#wrap {
  @include flexCenter;
  position: relative;
  cursor: pointer;
  margin: 10px;
  $size: 60px;
  height: $size;
  width: $size;
  border-radius: $size/2;
  background: white;
  color: black;
  transition: all 0.3s;
  box-shadow: 0px 0px 10px $shadow;
  &:hover {
    transform: scale(1.1);
  }
  img {
    height: $size * 0.6;
    width: $size * 0.6;
    color: #000;
  }
}
.biger {
  z-index: 100;
  animation: 0.6s goHome ease-in-out;
}
.shake {
  z-index: 100;
  animation: 0.3s shake 2;
}
@keyframes goHome {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(200);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shake {
  0% {
    transform: translateX(0) scale(1.1);
  }
  25% {
    transform: translateX(-10%) scale(1.1);
    z-index: 100;
  }
  50% {
    transform: translateX(0) scale(1.1);
    z-index: 100;
  }
  75% {
    transform: translateX(10%) scale(1.1);
    z-index: 100;
  }
  100% {
    transform: translateX(0) scale(1.1);
  }
}
</style>
