<template>
  <div id="wrap" @click="goHome">
    HOME
  </div>
</template>

<script>
export default {
  name: 'homeBtn',
  methods: {
    goHome() {
      console.log()
      if (this.$route.path !== '/') {
        this.$router.push('/account/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/normal';
#wrap {
  @include flexCenter;
  cursor: pointer;
  margin: 10px;
  $size: 60px;
  height: $size;
  width: $size;
  border-radius: $size/10;
  background: white;
  color: black;
  transition: all 5s;
  box-shadow: 2px 2px 2px $shadow;
  &:hover {
    transform: scale(1.3);
  }
}
</style>
