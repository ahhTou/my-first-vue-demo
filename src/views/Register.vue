<template>
<transition name="fade">
  <div v-show="isShow">
    <body-title>
      <template v-slot:big>Register</template>
    </body-title>
    <div id="content">
      <!-- <common-img>注册</common-img> -->
      <div id="registerBox">
        <register-block></register-block>
      </div>
    </div>
  </div>
</transition>

</template>


<script>
import bodyTitle from "components/main/title";
import RegisterBlock from "components/common/login&register/RegisterBlock";
import commonImg from "components/common/login&register/commonImg";
export default {
  name: "viewsRegister",
  data() {
    return {
      isShow:false
    }
  },
  components: {
    bodyTitle,
    RegisterBlock,
    commonImg
  },
  mounted() {
    document.title = this.$route.meta.title;
    setTimeout(()=>{
      this.isShow = true;
    },100)
  }
};
</script>

<style scoped>
#content {
  display: flex;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px);
}
</style>