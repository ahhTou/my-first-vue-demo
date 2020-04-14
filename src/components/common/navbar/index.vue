<template>
  <div id="navBarBody">
    <div id="navBody" :style="navBodyShow">
      <login-or-register />
      <home-btn />
    </div>
  </div>
</template>
<script>
import loginOrRegister from 'components/common/login&register/button/index'
import homeBtn from 'components/common/navbar/button/home'
export default {
  name: 'navbar',
  components: {
    loginOrRegister,
    homeBtn
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
@media screen and (min-width:768px) {
  @import './lib/pc';
}
@media screen and (max-width:768px) {
  @import './lib/mobile';
}
#navBody {
  @include flexCenter;
  height: 100px;
  border-radius: 10px;
  margin: 10px;
  width: auto;
  box-shadow: 2px 2px 2px $shadow;
  padding: 0px 20px 0px 20px;
}
</style>
