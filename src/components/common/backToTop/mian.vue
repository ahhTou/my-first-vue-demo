<template>
  <div id="all">
    <div>
      <transition name="fadeUp">
        <div id="f" @click="funToUp" v-show="isShow">
          <div>
            <div id="to">➦</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
import isMobile from "../isMobile.js";
export default {
  name: "backToUp",
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    if (isMobile.isMobile()) {
      this.isShow = false;
    }
    window.addEventListener("scroll", this.Onscroll);
  },
  methods: {
    funToUp() {
      this.$store.commit("windowsToTop");
      this.isShow = false;
    },
    Onscroll() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
};
</script>


<style scoped>
#all {
  position: fixed;
  left: 10px;
  bottom: 0px;
  width: 100px;
  height: 280px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
#f {
  position: relative;
  bottom: -30px;
  width: 80px;
  height: 80px;
  border-radius: 80px;

  margin: 0px;
  background-color: rgb(189, 208, 207);

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 20px;
  overflow: hidden;
  box-shadow: 2px 2px 5px #aaa;
  transition: all 1s;
}
#f:hover {
  translate: all 1s;
  background-color: rgb(79, 125, 164);
}

#f:hover #to {
  animation: 1s up;
}
#to {
  transform: rotate(-90deg) rotateX(180deg);
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes up {
  0% {
    transform: rotate(-90deg) translateX(0vw) rotateX(180deg);
  }
  25% {
    transform: rotate(-90deg) translateX(-0.8vw) rotateX(180deg);
  }
  50% {
    transform: rotate(-90deg) translateX(0.8vw) rotateX(180deg);
  }
  75% {
    transform: rotate(-90deg) translateX(-0.8vw) rotateX(180deg);
  }
  100% {
    transform: rotate(-90deg) translateX(0vw) rotateX(180deg);
  }
}

@keyframes fade {
}

.fadeUp-enter-active,
.fadeUp-leave-active {
  transition: opacity 0.5s;
}
.fadeUp-enter, .fadeUp-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-100px);
}
</style>