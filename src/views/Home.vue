<template>
  <div id="welBody">
    <body-title>
      <template #big>Hi~</template>
      <template #little>{{ username }}</template>
    </body-title>

    <div id="content">
      <content-plate></content-plate>
    </div>
  </div>
</template>

<script>
import ContentPlate from 'components/common/plate/main'
import bodyTitle from 'components/common/body-title/BodyTitle'
export default {
  name: 'viewsWelCome',
  data() {
    return {
      username: '请登录'
    }
  },
  components: {
    ContentPlate,
    bodyTitle
  },
  computed: {
    userBaseMsg() {
      this.username = this.$store.state.userBaseMsg.nickname
      if (this.username == null || this.username == '') {
        this.username = '请登录'
      }
      return this.$store.state.userBaseMsg.nickname
    }
  },
  watch: {
    userBaseMsg(val) {
      this.username = val
    }
  },
  mounted() {
    document.title = this.$route.meta.title
  }
}
</script>

<style scoped>
#welBody {
  overflow: hidden;
}
#content {
  display: flex;
  justify-content: center;
}
</style>
