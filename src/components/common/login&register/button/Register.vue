<template>
  <div id="wrap">
    <div
      id="btn"
      @mouseenter="show"
      @mouseleave="unshow"
      @click="goto"
      :class="isAnm"
    >
      <span id="span1">+</span>
      <transition name="span-fade">
        <span id="span2" v-show="isSpanShow">注册</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'btnRegister',
  props: ['anm'],
  data() {
    return {
      isSpanShow: false,
      isAnm: {
        toAnm: false,
        inAnm: false
      }
    }
  },
  methods: {
    show() {
      this.isSpanShow = true
    },
    unshow() {
      this.isSpanShow = false
    },
    goto() {
      this.$router.push('/account/register')
    }
  },
  watch: {
    anm(val) {
      if (!this.anm) {
        this.isAnm.toAnm = true
        this.isAnm.inAnm = false
      } else {
        this.isAnm.toAnm = false
        this.isAnm.inAnm = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/normal';
#wrap {
  @include flexCenter();
  margin: 10px;
  font-size: 17px;
  #btn {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background: rgb(96, 174, 64);
    font-family: 'Microsoft YaHei';
    letter-spacing: 10px;
    text-indent: 10px;
    color: white;
    box-shadow: 2px 2px 5px #aaa;
    transition: width 0.5s;
    &:hover {
      width: 140px;
      cursor: pointer;
    }
  }
  #span1 {
    @include flexCenter();
    width: 60px;
    height: 60px;
  }
  #span2 {
    @include flexCenter();
    transition: all 1s;
    position: relative;
    bottom: 60px;
    width: 140px;
    height: 60px;
  }
}
.span-fade-enter-active {
  transition: all 0.8s;
}

.span-fade-leave-active {
  transition: all 0.1s;
}
.span-fade-enter,
.span-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.toAnm {
  transform-origin: 50% 50%;
  animation: anm 1s ease;
  animation-fill-mode: forwards;
}
.inAnm {
  transform: rotate(0deg);
  background: rgb(150, 150, 150);
  transform-origin: 50% 50%;
  animation: anmIn 1s ease;
  animation-fill-mode: forwards;
}
@keyframes anm {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-180deg);
    background: rgb(177, 177, 177);
  }
}
@keyframes anmIn {
  0% {
    transform: rotate(-180deg);
    background: rgb(177, 177, 177);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
