<template>
  <form action method="post">
    <div>
      <input type="text" name="username" placeholder="输入邮箱或账户ID" v-model="accountID" />
    </div>
    <div>
      <input type="password" name="password" placeholder="请输入密码" v-model="password" />
    </div>
    <div id="checkBoxStyle">
      <input type="checkbox" name="remember" value="remember" v-model="rememberMe" />
      <span id="checkBoxFont">记住我</span>
    </div>
    <div id="LoginBtn">
      <input type="button" class="btnLine" value="登录" :class="errOrNot" @click="toLogin" />
    </div>
  </form>
</template>


<script>
import { loginAccount } from "network/accountMsg";
import md5 from "js-md5";
export default {
  name: "",
  data() {
    return {
      accountID: "",
      password: "",
      rememberMe: false,
      errOrNot: {
        isRight: true,
        isErr: false,
        isAni: false
      },
      tips: []
    };
  },
  methods: {
    toLogin() {
      let timer;
      const thisPassword = md5(this.password);
      const thisaccountID = this.accountID;
      const account = {
        userID: thisaccountID,
        password: thisPassword
      };
      loginAccount(account).then(res => {
        // console.log(res.data);
        if (res.data.code === "1") {
          console.log("登录成功");
          if (this.rememberMe) {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("login", true);
            window.localStorage.setItem("rememberMe", true);
          }
          this.$store.commit("addLoginToken", res.data.token);
          this.$store.commit("getuserBaseMsg", res.data);
          this.$store.commit("setLogin",true)
          console.log('vuex:',this.$store.state.login)
          // console.log(;
          console.log(window.localStorage);
        } else {
          clearTimeout(timer);
          this.errOrNot.isRight = false;
          this.errOrNot.isErr = true;
          this.errOrNot.isAni = true;
          timer = setTimeout(() => {
            this.errOrNot.isAni = false;
          }, 300);
          console.log("登录失败");
        }
      });
    }
  }
};
</script>


<style scoped>
@import url("./lib/common.css");
@import "./lib/pc.css" screen and (min-width: 768px);
@import "./lib/mobile.css" screen and (max-width: 768px);
#checkBoxStyle {
  margin: 0px 10px 10px 10px;
  height: 40px;
  display: flex;
  align-items: center;
}
#LoginBtn {
  width: max-width;
  display: flex;
  margin-bottom: 100px;
}
input[type="button"] {
  flex: 1;
  margin: 0px 10px 0px 10px;
}
input[type="button"]:hover {
  background: rgba(0, 136, 255, 0.7);
}
input[type="checkBox"] {
  outline: none;
  height: 25px;
  width: 25px;
  margin-right: 10px;
}
input[type="checkBox"]::before {
  content: "";
  position: absolute;
  background-color: white;
  color: rgb(114, 151, 182);
  outline: none;
  border: 1px solid rgb(114, 151, 182);
  height: 25px;
  width: 25px;
  border-radius: 0px;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type="checkBox"]:hover::before {
  transform: scale(1.1);
  background-color: white;
}
input[type="checkBox"]:checked::before {
  background-color: white;
  content: "✔";
  font-size: 40px;
}
#checkBoxFont {
  font-size: 15px;
}
</style>