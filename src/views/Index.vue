<template>
  <div id="wrap">
    <div id="header">
      <navbar class="navbar-isShow" />
    </div>
    <div id="content">
      <div id="theTouchBg" :style="theTouchBgStyle" />
      <transition name="router-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <tow-color-bg />
    <div :class="bgMask" />
    <back-to-top />
  </div>
</template>

<script>
import towColorBg from 'components/common/two-color-background/index'
import backToTop from 'components/common/click-to-top/ClickToTop'
import navbar from 'components/common/navbar/index'

import { default as GetUserBaseData } from 'assets/js/get-account-base-msg-Api.js'
import isMobile from 'assets/js/isMobile.js'
export default {
  name: 'Index',
  components: {
    backToTop,
    towColorBg,
    navbar
  },
  data() {
    return {
      theTouchBgStyle: { position: 'fixed', zIndex: -11 },
      bgMask: { bgb1: true, bgb2: false },
      index: ''
    }
  },
  methods: {
    setLogin() {
      const key = window.localStorage.getItem('rememberMe')
      const token = window.localStorage.getItem('token')
      const login = window.localStorage.getItem('login')
      if (key === 'true') this.$store.commit('setLogin', { login, token })
    },
    getUserBaseData() {
      if (window.localStorage.getItem('login') === 'true') {
        const token = window.localStorage.getItem('token')
        GetUserBaseData(this)
      }
    }
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
      this.getUserBaseData()
    }
  },
  created() {
    this.getUserBaseData()
  },
  mounted() {
    this.setLogin()
  },
  destroyed() {
    const key = window.localStorage.getItem('rememberMe')
    if (key === 'false') this.$store.commit('closeLogin')
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
@media screen and (orientation: portrait) {
  .navbar-isShow {
    display: none;
  }
}
@media screen and (orientation: landscape) {
  .navbar-isShow {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
  }
}
#wrap {
  @include flexCenter();
  overflow: hidden;
  width: 100%;
  #content {
    display: flex;
    // align-items: center;
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
  transition: all 0.1s;
}
.router-fade-enter {
  opacity: 0;
  transform: translateY(-200px);
}
.router-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
