<template>
  <div id="wrap">
    <button class="btn" id="btn1" @click="goHome">﹤</button>
    <div id="title">{{ $route.meta.title }}</div>
    <button class="btn" id="btn2" @click="goWhere">{{ btnName }}</button>
  </div>
</template>

<script>
export default {
  name: 'thisBar',
  data() {
    return {
      btnName: ''
    }
  },
  computed: {
    btnNameWatch() {
      this.changeName()
      return this.$route.name
    }
  },

  watch: {
    btnNameWatch() {
      this.changeName()
    }
  },
  methods: {
    changeName() {
      if (this.$route.name === 'login') {
        this.btnName = 'register'
      } else {
        this.btnName = 'login'
      }
    },
    goHome() {
      this.$router.push('/')
    },
    goWhere() {
      let name = this.$route.name
      if (name === 'login') this.$router.push('/account/register')
      else this.$router.push('/account/login')
    }
  }
}
</script>

<style scoped>
@import url('~assets/css/normalize.css');
button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
}
#wrap {
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
#title {
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
