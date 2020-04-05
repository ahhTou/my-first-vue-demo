<template>
  <div>
    <div id="hatchBoxMax">
      <div :class="hatchBoxAfter" @mouseenter="panelBiger" @mouseleave="panelLitter">
        <div :class="hatchBox" :style="profilePhoto" :title="hoverTips" />
      </div>
      <transition name="fadePanel">
        <div id="hatchPanel" v-show="panelShow" @mouseenter="panelBiger" @mouseleave="panelLitter">
          <p id="nickname">{{ nickname }}</p>
          <div v-for="(item, index) in hatchManager" :key="index" @click="clickTo(item)">
              <div :class="item.id > 0 ? 'panelList' : 'panelListOut'">
                <span class="fontLogo">{{ item.logoFont }}</span>
                <span>{{ item.name }}</span>
              </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
import { getUserHatchData } from "network/userHatch";
export default {
  name: "msgWindow",
  data() {
    return {
      nickname: null,
      hoverTips: null,
      profilePhoto: null,
      hatchManager: null,
      panelShow: false,
      hatchBox: { hatchBox: true, hatchBoxBiger: false },
      hatchBoxAfter: { hatchBoxAfter: true, hatchBoxAfterBiger: false }
    };
  },
  methods: {
    clickTo(item, event) {
      if (item.id === "-1") {
        this.$store.commit("closeLogin");
        this.$router.go(0);
      }
      else{
        this.$router.push(item.url)
      }
    },
    panelBiger: function() {
      this.panelShow = true;
      this.hatchBoxAfter.hatchBoxAfterBiger = true;
      this.hatchBox.hatchBoxBiger = true;
    },
    panelLitter: function() {
      this.panelShow = false;
      this.hatchBoxAfter.hatchBoxAfterBiger = false;
      this.hatchBox.hatchBoxBiger = false;
    }
  },
  computed: {
    watchNickname() {
      return this.$store.state.userBaseMsg;
    }
  },
  watch: {
    watchNickname(val) {
      this.nickname = val.nickname;
      this.hoverTips = "点击进入 " + val.nickname + " 的档案";
      console.log(val.profilePhoto);
      this.profilePhoto = {
        background: 'url("' + val.profilePhoto + '")',
        backgroundSize: 'cover'
      };
      console.log(this.profilePhoto);
    }
  },
  created() {
    getUserHatchData().then(result => {
      this.hatchManager = result.data;
    });
  }
};
</script>


<style scoped>
a {
  text-decoration: none;
}
/* 最外部盒子 */
#hatchBoxMax {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 300px;
  height: 500px;
  display: flex;
  justify-content: center;
  margin: 10px;
  z-index: 10000000;
}
/* 头像 */
.hatchBox {
  width: 85px;
  height: 85px;
  border-radius: 80px;
  opacity: 0.9;
  margin: 0px auto;
  position: absolute;
  z-index: 100;
}
.hatchBoxBiger {
  opacity: 1;
}

/* 头像外层 */
.hatchBoxAfter {
  width: 90px;
  height: 90px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background: rgba(255, 255, 255, 0);
  background-size: cover;
  transition: all 0.5s;
  transform-origin: 50% 0%;
}
.hatchBoxAfterBiger {
  transform: scale(1.3, 1.3);
  background-color: rgba(255, 255, 255, 1);
}

#hatchPanel {
  /* 250px */
  width: 250px;
  background-color: white;
  position: absolute;
  border-radius: 5px;
  top: 75px;
  z-index: 1;
  display: inline-block;
  box-shadow: 2px 2px 5px rgb(138, 138, 138);
  transform-origin: 50% 0%;
}

#nickname {
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  font-size: 15px;
  color: rgb(211, 81, 91);
}
.panelList,
.panelListOut {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: rgb(51, 51, 51);
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 1);
  display: flex;
  transition: all 0.3s;
  cursor: pointer;
}
.panelList span,
.panelListOut span {
  transition: all 0.3s;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-0.75rem);
}
.panelList:hover span,
.panelListOut:hover span {
  transform: translateX(0.2rem);
}
.panelList:hover {
  background: rgb(219, 219, 219);
}
.fontLogo {
  transition: all 0.3s;
  opacity: 0;
  font-size: 1.5rem;
  transform: translateX(-1rem);
}
.panelList:hover .fontLogo,
.panelListOut:hover .fontLogo {
  transition: all 0.3s;
  opacity: 1;
  transform: translateX(0rem);
}
.panelListOut:hover {
  transition: color 0s;
  background: rgb(255, 121, 121);
  color: white;
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

/* vueCss */
.fadePanel-enter-active,
.fadePanel-leave-active {
  transition: all 0.3s;
}
.fadePanel-enter,
.fadePanel-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}
</style>