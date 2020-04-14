<template>
  <div id="wrap">
    <div :class="photo_wrap" @mouseenter="panelBiger" @mouseleave="panelLitter">
      <div :class="photo" :style="profilePhotoStyle" :title="hoverTips" />
    </div>
    <transition name="fadePanel">
      <div
        id="panel"
        v-show="panelShow"
        @mouseenter="panelBiger"
        @mouseleave="panelLitter"
      >
        <p id="nickname">{{ nickname }}</p>
        <div
          v-for="(item, index) in panel_data"
          :key="index"
          @click="clickTo(item)"
        >
          <div :class="item.id > 0 ? 'panelList' : 'panelList_out'">
            <span class="fontLogo">{{ item.logoFont }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getUserHatchData } from 'network/userHatch'
export default {
  name: 'msgWindow',
  data() {
    return {
      nickname: null,
      hoverTips: null,
      profilePhotoStyle: null,
      panel_data: null,
      panelShow: false,
      photo: { photo: true, photo_hover: false },
      photo_wrap: { photo_wrap: true, photo_wrap_hover: false }
    }
  },
  methods: {
    clickTo(item, event) {
      if (item.id === '-1') {
        this.$store.commit('closeLogin')
        this.$router.go(0)
      } else {
        if (this.$route.path !== item.url) {
          this.$store.commit('changeViews')
          setTimeout(() => {
            this.$router.push(item.url)
          }, 300)
        } else this.$router.go(0)
      }
    },
    panelBiger: function() {
      this.panelShow = true
      this.photo.photo_hover = true
      this.photo_wrap.photo_wrap_hover = true
    },
    panelLitter: function() {
      this.panelShow = false
      this.photo.photo_hover = false
      this.photo_wrap.photo_wrap_hover = false
    }
  },
  computed: {
    watchBaseData() {
      return this.$store.state.userBaseMsg
    }
  },
  watch: {
    watchBaseData(val) {
      this.nickname = val.nickname
      this.hoverTips = '点击进入 ' + val.nickname + ' 的档案'
      this.profilePhotoStyle = {
        backgroundImage: 'url("' + val.profilePhoto + '")',
        backgroundSize: 'cover'
      }
    }
  },
  created() {
    getUserHatchData().then(result => {
      this.panel_data = result.data
    })
  }
}
</script>

<style lang="scss" scoped>
@import './main';
a {
  text-decoration: none;
}




.fadePanel-enter-active,
.fadePanel-leave-active {
  transition: all 0.3s;
}
.fadePanel-enter,
.fadePanel-leave-to {
  position: absolute;
  opacity: 0;
  transform: scale(1, 0);
}
</style>
