<template>
  <transition name="fade" mode="out-in">
    <div id="content" v-if="$store.state.routerViews.profileIsSHow">
      <plate-profile></plate-profile>
    </div>
  </transition>
</template>

<script>
import plateProfile from 'components/main/profile/profile'
export default {
  name: 'profile',
  components: {
    plateProfile
  },
  mounted() {
    this.$store.state.routerViews.profileIsSHow = true
    document.title = this.$route.meta.title
  }
}
</script>

<style scoped>
@import url('./lib/fade.css');
#content {
  flex: 1;
  margin-top: 20vh;
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
