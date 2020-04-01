<template>
  <span id="body1">
    <div id="btn" @click="goto" >登入</div>
  </span>
</template>


<script>
export default {
  name: "btnLogin",
    methods: {
    goto() {
      this.$store.state.welcomeIsShow = false;
      this.$router.push("/login");
    }
  }
}; 
</script> 


<style scoped>
#body1 {
  float: left;
  /* width: 230px; */
  height: 100px;
      margin: 0px 10px 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
#btn {
  background: rgb(53, 136, 255);
  width: 200px;
  height: 60px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Microsoft YaHei";
  letter-spacing: 10px;
  text-indent: 10px;
  color: white;
  box-shadow: 2px 2px 5px #aaa;
  transition: all 0.5s;
  cursor: pointer;
}
#btn:hover {
  background: rgb(0, 107, 201);
}
</style>