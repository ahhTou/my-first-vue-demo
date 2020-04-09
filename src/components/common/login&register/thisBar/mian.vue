<template>
  <div id="thisBarBody">
    <button class="btn" id="btn1" @click="goHome">﹤</button>
    <div id="mainBar">{{ $route.meta.title }}</div>
    <button class="btn" id="btn2" @click="goWhere">{{ btnName }}</button>
  </div>
</template>

<script>
export default {
  name: "thisBar",
  data() {
    return {
      btnName: ""
    };
  },
  computed: {
    btnNameWatch() {
      this.changeName();
      return this.$route.name;
    }
  },

  watch: {
    btnNameWatch() {
      this.changeName();
    }
  },
  methods: {
    changeName() {
      if (this.$route.name === "login") {
        this.btnName = "register";
      } else {
        this.btnName = "login";
      }
    },
    goHome() {
      this.$store.commit("changeViews");
      setTimeout(() => {
        this.$router.push("/");
      }, 300);
    },
    goWhere() {
      let name = this.$route.name;
      this.$store.commit("changeViews");
      this.$store.state.routerViews.loginOrRegisterIsShow = true;
      if (name === "login") this.$router.push("/account/register");
      else this.$router.push("/account/login");
    }
  }
};
</script>

<style scoped>
@import url("~assets/css/normalize.css");
button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
}
#thisBarBody {
  padding-top: 30px;
  margin: 10px;
  display: flex;
}
.btn {
  width: 90px;
  height: 50px;
  border-radius: 3px;
  cursor: pointer;
}
#btn1 {
  font-size: 30px;
  background: white;
}
#btn2 {
  background: rgb(139, 204, 41);
  color: white;
}
.btn:hover {
  animation: btnAni 0.8s;
}
#mainBar {
  font-size: 30px;
  color: white;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes btnAni {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
