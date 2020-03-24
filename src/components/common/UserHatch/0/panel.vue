<template>
  <transition name="fadePanel">
    <div
      id="hatchPanel"
      v-show="panelMsg.isShow"
      :style="panelIn" 
      @mouseenter='panelBiger'
      @mouseleave='panelLitter'
      >
      <p id="username">{{ panelMsg.username }}</p>

      <div v-for="(item, index) in hatchManager" id="listBox" :key="index">

        <a :href="item.id>0?item.url:null">
          <div :class="item.id > 0 ? 'panelList':'panelListOut' " :key="index">
            <span class="fontLogo">{{ item.logoFont }}</span>
            <span>{{ item.name }}</span>
          </div>
        </a>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: "atchMsgPanel",
  props:['panelMsg'],
  methods: {
    panelBiger() {
      this.$emit('son_show')
    },
    panelLitter() {
      this.$emit('son_unshow')
    }
  },
  data() {
    return {
      hatchManager: [
        {
          id: 1,
          name: "个人中心",
          url: "www.baidu.com",
          logoFont: "➜"
        },
        {
          id: 2,
          name: "追番列表",
          url: "www.bilibili.com",
          logoFont: "★"
        },
        {
          id: -1,
          name: "退出",
          logoFont: "✗"
        }
      ],
      panelIn: {},
    };
  },
};
</script>


<style scoped>
a {
  text-decoration: none;
}
#hatchPanel {
  position: relative;
  width: 15.6rem;
  background-color: white;
  border-radius: 5px;
  top: -10px;
  z-index: 1;
  box-shadow: 2px 2px 5px rgb(138, 138, 138);
  transform-origin: 50% 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#username {
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 10px;
  font-size: 15px;
  color: rgb(211, 81, 91);
}
#listBox {
  width: inherit;
}
.fontLogo {
  transition: all 0.3s;
  opacity: 0;
  font-size: 1.5rem;
  transform: translateX(-1rem);
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
  margin-bottom: 0.5rem;
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