<template>
  <div :class="a1" v-drag="maxBoxOpen">
    <div id="hatchBoxMax" :class="hatchBoxMax" >
      <div
        :class="hatchBoxAfter"
        v-on="{ mouseenter:panelBiger,
                mouseleave:panelLitter,
                dblclick:closeHatchMsgPanel,
                click:hatchMsgPanel}"
      >
        <div :class="hatchBox" v-bind:title="clickTo + ' ' + username + ' '+ aimsMe "></div>
        <span v-if="isShow" class="hatchMsgBlock">{{ username }}</span>
        <div id="tipsDblclickToClose" v-if="isShow">
          <p>双击任意地方关闭信息面板</p>
        </div>
      </div>
      <msg-panel v-bind:panelMsg="panelMsg" @son_show='panelBiger' @son_unshow='panelLitter' v-if="!maxBoxOpen"/>
    </div>
  </div>
</template>


<script>
import MsgPanel from "./panel";

export default {
  name: "uH",
  components: {
    MsgPanel
  },
  data() {
    return {
      aaa: true,
      clickTo: "点击进入",
      aimsMe: "控制面板",
      username: "偷偷呼吸的死肥宅",
      a1:{
        a1:true,
        a1Open:false,
      },
      hatchBox: {
        hatchBox: true,
        hatchBoxOpen: false,
        hatchBoxBiger: false
      },
      hatchBoxAfter: {
        hatchBoxAfter: true,

        hatchBoxAfterOpen: false,
        hatchBoxAfterBiger: false,
        hatchBoxAfterOpenPos: false
      },
      hatchBoxMax: {
        hatchBoxMax: true,
        hatchBoxMaxOpen: false,
        transitionAnm: true
      },
      isRight: true,
      panelShow: true,
      maxBoxOpen: false,
      isShow: false,
      isShowTimeOut: null,
      panelMsg: {
        isShow: false,
        username: String
      }
    };
  },
  mounted() {
    this.panelMsg.username = this.username;
  },
  methods: {
    //鼠标监听
    panelBiger() {
      if (!this.maxBoxOpen) {
        this.panelMsg.isShow = true;
        this.hatchBoxAfter.hatchBoxAfterBiger = true;
        this.hatchBox.hatchBoxBiger = true;
      }
    },
    panelLitter() {
      if (!this.maxBoxOpen) {
        this.panelMsg.isShow = false;
        this.hatchBoxAfter.hatchBoxAfterBiger = false;
        this.hatchBox.hatchBoxBiger = false;
      }
    },
    //点击打开面板
    hatchMsgPanel() {
      if (this.isShow == false) {
        let that = this;
        that.a1.a1Open = true
        this.maxBoxOpen = true;
        (this.isShowTimeOut = setTimeout(function() {
          that.isShow = true;
          that.hatchBoxMax.transitionAnm = false;
          window.clearTimeout(that.isShowTimeOut);
        }, 500)),
          (this.panelShow = false),
          (this.clickTo = "点击切换"),
          (this.aimsMe = "的头像"),
          (this.hatchBoxMax.hatchBoxMaxOpen = true),
          (this.hatchBoxAfter.hatchBoxAfterBiger = false),
          (this.hatchBoxAfter.hatchBoxAfterOpen = true);
        this.hatchBoxAfter.hatchBoxAfterOpenPos = true;
        this.hatchBox.hatchBoxOpen = true;
      }
    },

    //双击关闭面板
    closeHatchMsgPanel() {
      let that = this;
      // console.log(maxBoxOpen);
      if (that.maxBoxOpen) {

        that.panelMsg.isShow = false;
        that.a1.a1Open = false;
        that.isShow = false;
        that.maxBoxOpen = false;
        that.clickTo = "点击进入";
        that.aimsMe = "控制面板";
        that.hatchBoxMax.transitionAnm = true;
        that.isShowTimeOut = setTimeout(function() {
          that.hatchBoxAfter.hatchBoxAfterOpenPos = false;
          window.clearTimeout(that.isShowTimeOut);
        }, 500),
          //最外部盒子
          (that.hatchBoxMax.hatchBoxMaxOpen = false);

        //面板打开
        that.hatchBoxAfter.hatchBoxAfterBiger = false;
        that.hatchBoxAfter.hatchBoxAfterOpen = false;

        that.hatchBox.hatchBoxOpen = false;
      }
    },

    a1() {
      let that = this;
      console.log("anm===" + that.hatchBoxMax.transitionAnm);
    }
  },

  directives: {
    drag(el, binding) {
      let odiv = el;
      odiv.onmousedown = e => {
        if (binding.value) {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;

          document.ondblclick = e => {
            odiv.style.right = 0 + "px";
            odiv.style.top = 0 + "px";
            odiv.style.left = "unset";
          };

          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };

          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      };
    }
  }
};
</script>


<style scoped>
.a1 {
  width: 350px;
  height: 550px;
  position: fixed;
  top: 0px;
  right: 0px;
  overflow: hidden;
  /* background: blueviolet; */
  align-items: center;
  display: flex;
  justify-content: center;
    transition: all 0.5s;
}
.a1Open{
  width: 1000px;
  height: 600px;
  justify-content: unset;
      transition: all 0s;
}

.transitionAnm {
  transition: all 0.5s;
}

.transitionAnmNone {
  transition: none;
}
/* 最外部盒子 */
.hatchBoxMax {
  width: 300px;
  height: 500px;
  float: right;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  /* background: blue; */
}
.hatchBoxMaxOpen {
  width: 1000px;
  height: 600px;
  justify-content: unset;
}

/* 头像 */
.hatchBox {
  width: 85px;
  height: 85px;
  border-radius: 80px;
  background: url("../../../assets/img/test/t1.jpg");
  background-size: cover;
  opacity: 0.7;
  /* transition: all 0.5s; */

  margin: 0px auto;
  position: absolute;
}
.hatchBoxBiger {
  opacity: 1;
}
.hatchBoxOpen {
  position: relative;
  opacity: 1;
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin: 20px;
}

/* 头像外层 */
.hatchBoxAfter {
  width: 90px;
  height: 90px;
  border-radius: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;
  background: rgba(255, 255, 255, 0);
  background-size: cover;
  transition: all 0.5s;
  transform-origin: 50% 0%;
  transform: scale(1, 1);
  /* transition-timing-function:ease-out; */
  /* transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59); */
}
.hatchBoxAfterOpen {
  width: 1000px;
  height: 600px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50px 20px 20px 20px;
  box-shadow: 2px 2px 5px rgb(138, 138, 138);
}
.hatchBoxAfterOpenPos {
  align-items: unset;
  justify-content: unset;
}
.hatchBoxAfterBiger {
  /* transform-origin: 50% 50%; */
  transform: scale(1.3, 1.3);
  background-color: rgba(255, 255, 255, 1);
}

#tipsDblclickToClose {
  width: 1000px;
  height: 50px;
  color: gray;
  font-family: "等线";
  position: absolute;
  display: flex;
  transition: all 0.5s;
  bottom: 0px;
  justify-content: center;
  align-items: center;
  opacity: 1;
  animation: 2s tipsDblclickToClose;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
@keyframes tipsDblclickToClose {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

.hatchMsgBlock {
  position: relative;
  height: 85px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 30px;
  line-height: 85px;
  color: rgb(211, 81, 91);
}
</style>