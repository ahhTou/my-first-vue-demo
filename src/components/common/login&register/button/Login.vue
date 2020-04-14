<template>
  <span id="wrap">
    <div id="btn" @click="goto">登入</div>
  </span>
</template>

<script>
export default {
  name: 'btnLogin',
  methods: {
    goto() {
      this.$router.push('/account/login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/normal';
#wrap {
  @include flexCenter();
  margin: 10px;
  font-size: 20px;
  #btn {
    @include flexCenter();
    background: rgb(53, 136, 255);
    height: 60px;
    width: 200px;
    border-radius: 2px;
    font-family: 'Microsoft YaHei';
    letter-spacing: 10px;
    text-indent: 10px;
    color: white;
    box-shadow: 2px 2px 5px #aaa;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background: rgb(0, 107, 201);
    }
  }
}
</style>
