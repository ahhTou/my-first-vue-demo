<template>
  <div id="lorBody">
    <body-title>
      <template v-slot:big>{{ lrTitle }}</template>
    </body-title>
    <div id="lorRBox">
      <div id="barAndRouterViewsBody">
        <this-bar></this-bar>
        <transition name="router-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import thisBar from 'components/common/login&register/thisBar/mian'
import bodyTitle from 'components/main/title'
export default {
  name: '',
  data() {
    return {
      lrTitle: ''
    }
  },
  components: {
    thisBar,
    bodyTitle
  },
  mounted() {
    this.lrTitle = this.$route.name
    this.barTitle = this.$route.meta.title
  },
  computed: {
    routerName() {
      return this.$route.name
    }
  },
  watch: {
    routerName() {
      this.lrTitle = this.$route.name
    }
  }
}
</script>

<style scoped>
#lorRBox {
  width: 100vw;
  display: flex;
  justify-content: center;
}
.router-fade-enter-active {
  transition: all 0.3s;
}
.router-fade-leave-active {
  transition: all 0.3s;
}
.router-fade-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.router-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
