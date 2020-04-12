<template>
  <div id="wrap">
    <tow-color-bg />
    <back-to-top />
    <div :class="bgMask" />
    <div id="header">
      <div id="userhatch_wrapper" v-show="$store.state.login">
        <user-hatch />
      </div>
    </div>
    <div id="content">
      <div id="theTouchBg" :style="theTouchBgStyle" />
      <router-view />
    </div>
  </div>
</template>

<script>
import towColorBg from 'components/common/twoColorBackGround/bg'
import backToTop from 'components/common/backToTop/mian'
import UserHatch from 'components/common/UserHatch/UserHatch'
import { getAccountBaseMsg } from 'network/accountMsg'
export default {
  name: 'Index',
  components: {
    backToTop,
    towColorBg,
    UserHatch
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
        getAccountBaseMsg().then(result => {
          if (result.data !== 'err') {
            this.$store.commit('setUserBaseMsg', result.data)
          } else {
            this.$store.commit('closeLogin')
          }
        })
      }
    }
  },
  created() {
    if (window.localStorage.getItem('login') === 'true') {
      const token = window.localStorage.getItem('token')
      getAccountBaseMsg().then(result => {
        if (result.data !== 'err') {
          this.$store.commit('setUserBaseMsg', result.data)
        } else {
          this.$store.commit('closeLogin')
        }
      })
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
</style>
