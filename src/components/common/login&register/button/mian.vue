<template>
    <div id="lr_btnline">
      <div @mouseleave="f1" @mouseenter="f2">
        <btn-login/>
      </div>
      <btn-register :anm='itAnm'/>
    </div>
</template>


<script>
import btnLogin from "./Login";
import btnRegister from "./Register";
export default {
  name: "loginAndregisterBtn",
  components: {
    btnLogin,
    btnRegister
  },

  data() {
    return {
        itAnm:false,
    };
  },
  methods: {
    f1() {
      this.itAnm = true;
    },
    f2() {
      this.itAnm = false;
    }
  }
};
</script>


<style scoped>
#lr_btnline {
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
}
.normal {
  opacity: 1;
}
.toAnm1 {
  animation: anm 0.1s 0.1s linear infinite alternate;
}
@keyframes anm {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>