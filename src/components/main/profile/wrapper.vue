<template>
  <div id="wrap">
    <div id="title">
      <slot name="title"></slot>
    </div>
    <div id="wrapper">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileMain'
}
</script>

<style lang="scss" scoped>
#wrap {
  margin: 5px;
  #title {
    width: 350px;
    color: rgb(161, 161, 161);
    margin: 3px;
  }
  #wrapper {
    position: relative;
    width: 350px;
    height: 500px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 3px 10px #aaa;
    transition: all 0.5s;
    display: flex;
    padding: 10px;
    transform: translateY(-20px);
    &:hover {
      transform: translateY(0px);
    }
  }
}
</style>
