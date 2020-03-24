<template>
  <div>
    <div id="btnline">
      <transition>
        <btn-login />
      </transition>

      <transition>
        <btn-register />
      </transition>
    </div>
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
  }
};
</script>


<style scoped>
#btnline {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  display: inline-block;
  width: 500px;
  /* background: black; */
}
</style>