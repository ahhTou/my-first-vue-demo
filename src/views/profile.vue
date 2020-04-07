<template>
  <div id="test">
    <div id="content">
        <plate-profile></plate-profile>
    </div>
  </div>
</template>


<script>
import plateProfile from "components/main/profile/profile";
export default {
  name: "profile",
  components: {
    plateProfile
  }
};
</script>


<style scoped>
#content{
    margin: 20vh 10vw 0 10vw;
}
</style>