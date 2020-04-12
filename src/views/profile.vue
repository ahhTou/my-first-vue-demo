<template>
  <div id="content">
    <plate-profile></plate-profile>
  </div>
</template>

<script>
import plateProfile from 'components/main/profile/profile'
export default {
  name: 'profile',
  components: {
    plateProfile
  }
}
</script>

<style scoped>
#content {
  flex: 1;
  margin-top: 20vh;
  padding: 10px;
  background: black;
  display: flex;
  justify-content: center;
}
</style>
