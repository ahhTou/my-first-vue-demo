<template>
  <div id="click-to-top-wrap">
    <transition name="fadeUp">
      <div id="f" @click="funToUp" v-show="isShow">
        <div id="font">➦</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'backToUp',
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.Onscroll)
  },
  methods: {
    funToUp() {
      this.$store.commit('windowsToTop')
      this.isShow = false
    },
    Onscroll() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 80px;
@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
#click-to-top-wrap {
  @include flexCenter();
  width: $size;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 100;
  cursor: pointer;
  #f {
    @include flexCenter();
    position: relative;
    width: $size;
    height: $size;
    border-radius: $size;
    margin: 0px;
    background-color: rgb(189, 208, 207);
    color: white;
    font-size: 20px;
    overflow: hidden;
    box-shadow: 2px 2px 5px #aaa;
    transition: all 1s;
    &:hover {
      translate: all 1s;
      background-color: rgb(79, 125, 164);
      #font {
        animation: 1s up;
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
    }
    #font {
      @include flexCenter();
      transform: rotate(-90deg) rotateX(180deg);
      width: $size;
      height: $size;
    }
  }
}
.fadeUp-enter-active,
.fadeUp-leave-active {
  transition: opacity 0.5s;
}
.fadeUp-enter,
.fadeUp-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
