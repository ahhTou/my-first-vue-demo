<template>
  <div id="navBarBody">
    <div id="navBody" :style="navBodyShow">
      <home-btn />
      <div id="userhatch-wrap" v-show="$store.state.login">
        <userhatch />
      </div>
      <login-or-register />
    </div>
  </div>
</template>
<script>
import Userhatch from 'components/common/navbar/user-hatch/index'
import loginOrRegister from 'components/common/navbar/button/login-and-register/index'
import homeBtn from 'components/common/navbar/button/home'
export default {
  name: 'navbar',
  components: {
    loginOrRegister,
    homeBtn,
    Userhatch
  },
  data() {
    return {
      num: 0,
      navBodyShow: {
        background: 'rgba(189, 208, 207,0)',
        boxShadow: '2px 2px 5px rgba(170, 170, 170, 0)'
      }
    }
  },

  mounted() {
    const that = this
    window.addEventListener('scroll', function() {
      if (document.documentElement.scrollTop <= 700) {
        that.num = document.documentElement.scrollTop / 700
        that.navBodyShow.background = 'rgba(189, 208, 207,' + that.num + ')'
        that.navBodyShow.boxShadow =
          '2px 2px 5px rgba(170, 170, 170,' + that.num + ')'
      }
    })
  },
  methods: {
    Onscroll() {
      let a = document.documentElement.scrollTop
      if (a <= 100) {
        a = a / 100
      }
    },
    a() {
      return 100
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/normal';
@import 'components/common/navbar/var';
#navBody {
  @include flexCenter;
  height: 100px;
  border-radius: 10px;
  margin: 10px;
  width: auto;
  box-shadow: 2px 2px 2px $shadow;
  padding: 0px 20px 0px 20px;
  #userhatch-wrap {
    @include flexCenter;
    width: $wrap-width * 0.4;
  }
}
</style>
