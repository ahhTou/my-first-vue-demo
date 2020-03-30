<template>
  <div id="body">
    <div id="mainPlate">
      <little-plate :data1="sondata[1]">
        <template v-slot:title>
          <span>{{ sondataTitle[1] }}</span>
        </template>
      </little-plate>
    </div>
    <div id="extraPlate">
      
      <little-plate :data1="sondata[2]">
        <template v-slot:title>
          <span>{{ sondataTitle[2] }}</span>
        </template>
      </little-plate>
      <little-plate :data1="sondata[0]">
        <template v-slot:title>
          <span>{{ sondataTitle[0] }}</span>
        </template>
      </little-plate>
      <little-plate :data1="sondata[0]">
        <template v-slot:title>
          <span>{{ sondataTitle[0] }}</span>
        </template>
      </little-plate>
      <little-plate :data1="sondata[0]">
        <template v-slot:title>
          <span>{{ sondataTitle[0] }}</span>
        </template>
      </little-plate>
    </div>
  </div>
</template>

<script>
import littlePlate from "./Views";
import { getPlateDate } from "network/welcome";
export default {
  name: "plateMain",
  data() {
    return {
      sondataTitle: [],
      sondataImg: [],
      sondata: {}
    };
  },
  components: {
    littlePlate
  },
  created() {
    getPlateDate().then(res => {
      this.sondata = res.data;
      for (let a of this.sondata) {
        this.sondataTitle.push(a.title);
        this.sondataImg.push(a.img);
        this.$store.state.views.bg = this.sondataImg;
      }
      this.$store.state.views.bg.unshift("");
    });
  }
};
</script>

<style scoped>
#body {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
}
#extraPlate {
  display: flex;
  width: 60rem;
  height: 60rem;
}
#mainPlate {
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  /* height: 30rem; */
}
</style>