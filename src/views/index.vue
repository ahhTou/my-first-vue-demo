<template>
  <div id="wrap">
    <tow-color-bg />
    <back-to-top />
    <div :class="bgMask" />
    <div id="header">
      <navbar />
      <div id="userhatch_wrapper" v-show="$store.state.login">
        <userhatch />
      </div>
    </div>
    <div id="content">
      <div id="theTouchBg" :style="theTouchBgStyle" />
      <transition name="router-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import towColorBg from 'components/common/two-color-background/index'
import backToTop from 'components/common/click-to-top/index'
import Userhatch from 'components/common/user-hatch/index'
import navbar from 'components/common/navbar/index'
import { default as GetUserBaseData } from 'assets/js/get-account-base-msg-Api.js'
export default {
  name: 'Index',
  components: {
    backToTop,
    towColorBg,
    Userhatch,
    navbar
  },
  data() {
    return {
      theTouchBgStyle: { position: 'fixed', zIndex: -11 },
      bgMask: { bgb1: true, bgb2: false },
      index: ''
    }
  },
  mounted() {
    const key = window.localStorage.getItem('rememberMe')
    const token = window.localStorage.getItem('token')
    const login = window.localStorage.getItem('login')
    if (key === 'true') this.$store.commit('setLogin', { login, token })
  },
  destroyed() {
    const key = window.localStorage.getItem('rememberMe')
    if (key === 'false') this.$store.commit('closeLogin')
  },
  computed: {
    isShow() {
      return this.$store.state.views.show
    },
    isIndex() {
      return this.$store.state.views.index
    },
    isLgoin() {
      return this.$store.state.login
    }
  },
  watch: {
    isShow(val) {
      this.bgMask.bgb2 = val
    },
    isIndex(val) {
      this.theTouchBgStyle.background =
        'url(' + this.$store.state.views.bg[val] + ')'
    },
    isLgoin(val) {
      if (window.localStorage.getItem('login') === 'true') {
        const token = window.localStorage.getItem('token')
        GetUserBaseData(this)
      }
    }
  },
  created() {
    if (window.localStorage.getItem('login') === 'true') {
      const token = window.localStorage.getItem('token')
      GetUserBaseData(this)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/base.css';
@import '~assets/scss/normal.scss';
@import '~assets/css/normalize.css';
@mixin bg-pos {
  position: fixed;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
}
#wrap {
  @include flexCenter();
  #header {
    #userhatch_wrapper {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 100;
    }
  }
  #content {
    display: flex;
    align-items: center;
    position: relative;
    #theTouchBg {
      @include bg-pos();
      z-index: -11;
      position: fixed;
      filter: blur(3px);
    }
  }

  .bgb1 {
    @include bg-pos();
    z-index: -8;
    opacity: 1;
    background: rgb(238, 240, 241);
    transition: all 2s;
  }
  .bgb2 {
    opacity: 0;
  }
}
.router-fade-enter-active {
  transition: all 0.3s;
}
.router-fade-leave-active {
  transition: all 0.3s;
}
.router-fade-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.router-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
