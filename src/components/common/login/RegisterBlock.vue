<template>
  <form method="post">
    <div>
      <div class="tips">{{ tips[0] }}</div>
      <input
        autocomplete="off"
        type="text"
        name="username"
        placeholder="输入账户ID"
        v-model="username"
        :class="errOrNot[0]"
      />
    </div>

    <div>
      <div class="tips">{{ tips[1] }}</div>
      <input
        autocomplete="off"
        type="text"
        name="email"
        placeholder="邮箱"
        v-model="email"
        :class="errOrNot[1]"
      />
    </div>

    <div>
      <div class="tips">{{ tips[2] }}</div>
      <input
        type="password"
        name="password"
        autocomplete="new-password"
        placeholder="请输入密码"
        v-model="password"
        :class="errOrNot[2]"
      />
    </div>

    <div>
      <div class="tips">{{ tips[3] }}</div>
      <input
        autocomplete="new-password"
        type="password"
        name="passwordAgain"
        placeholder="请重新输入密码"
        v-model="passwordAgain"
        :class="errOrNot[3]"
      />
      <div class="tips">{{ tips[4] }}</div>
    </div>

    <div id="button">
      <input
        autocomplete="off"
        type="button"
        id="btnSubmit"
        class="btnLine"
        value="注册"
        @click="submit"
        :class="errOrNot[4]"
      />
      <button
        type="button"
        id="btnClear"
        class="btnLine"
        name="butButton"
        value="重置"
        @click="clear"
        :class="errOrNot[5]"
      >
        重置
      </button>
    </div>
  </form>
</template>

<script>
import { checkUsername, checkEmail, registerAccount } from 'network/accountMsg'
import md5 from 'js-md5'
export default {
  name: 'InputBlock',
  data() {
    return {
      username: '',
      email: '',
      password: null,
      passwordAgain: null,
      submitOk: [false, false, false, false],
      errOrNot: [],
      time: 0,
      tips: ['ㅤ', 'ㅤ', 'ㅤ', 'ㅤ ', 'ㅤ']
    }
  },
  methods: {
    clear() {
      for (let a = 0; a < 4; a++) {
        this.$options.methods.toRight.bind(this)(a)
      }
      this.username = ''
      this.email = ''
      this.password = ''
      this.passwordAgain = ''
    },
    submit(event) {
      var isSubmitOk = 0
      for (let a = 0; a < 4; a++) {
        if (this.submitOk[a]) {
          isSubmitOk++
        }
      }
      if (isSubmitOk === 4) {
        let id = this.username
        let email = this.email
        let password = md5(this.password)
        let msg = {
          id,
          email,
          password
        }
        registerAccount(msg).then(res => {
          if (res.data == '1') {
            this.$toast('注册成功,请登录')
            this.$router.push('/account/login')
          }
        })
      } else {
        this.$options.methods.errAnimation.bind(this)(4)
      }
    },
    errAnimation(num) {
      this.errOrNot[num].isErr = true
      this.errOrNot[num].isAni = true
      this.errOrNot[num].isRight = false
      setTimeout(() => {
        this.errOrNot[num].isAni = false
      }, 300)
    },
    toRight(num) {
      this.tips[num] = this.tips[4]
      this.errOrNot[num].isErr = false
      this.errOrNot[num].isAni = false
      this.errOrNot[num].isRight = true
    }
  },
  watch: {
    username(val) {
      clearTimeout(this.time)
      if (val.length >= 3 && val.length <= 16) {
        this.toRight(0)
        this.time = setTimeout(() => {
          checkUsername(this.username).then(res => {
            if (res.data == '0') {
              this.errAnimation(0)
              this.tips[0] = '重复的ID'
            } else {
              this.submitOk[0] = true
            }
          })
        }, 300)
      }
    },
    email(val) {
      const emailFormat = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (emailFormat.exec(this.email)) {
        this.tips[1] = this.tips[4]
        clearTimeout(this.time)
        this.toRight(1)
        this.time = setTimeout(() => {
          checkEmail(this.email).then(res => {
            if (res.data == '0') {
              this.errAnimation(1)
              this.tips[1] = '重复的邮箱'
            } else {
              this.submitOk[1] = true
            }
          })
        }, 300)
      } else {
        this.errOrNot[1].isErr = true
        this.errOrNot[1].isRight = false
      }
    },
    password(val) {
      if (val.length >= 8) {
        this.submitOk[2] = true
      }
    },
    passwordAgain(val) {
      if (val != '' && val != null) {
        if (this.passwordAgain !== this.password) {
          this.errOrNot[3].isErr = true
          this.errOrNot[3].isRight = false
        } else {
          this.submitOk[3] = true
          this.errOrNot[3].isErr = false
          this.errOrNot[3].isRight = true
        }
      }
    }
  },
  mounted() {
    for (let a = 0; a < 6; a++) {
      this.errOrNot.push({
        isRight: true,
        isErr: false,
        isAni: false
      })
    }
  },
}
</script>

<style scoped>
@import url('./lib/common.css');
@import './lib/pc.css' screen and (min-width: 768px);
@import './lib/mobile.css' screen and (max-width: 768px);
#btnClear {
  margin-left: 10px;
  transition: all 0.5s;
}
#btnClear:active {
  transform: scale(0.8, 0.8);
}

#btnClear:hover {
  background: rgb(214, 224, 224);
}

input:focus {
  box-shadow: 1px 1px 2px #aaa;
}
.tips {
  margin: 0px 10px 0px 10px;
  color: red;
}
#button {
  position: relative;
  margin: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
#btnSubmit {
  position: relative;
  margin-right: 10px;
}
#btnSubmit:hover {
  background: rgba(0, 136, 255, 0.7);
}
</style>
