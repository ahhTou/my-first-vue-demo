<template>
  <div id="body">
    <div id="mainPlate">
      <little-plate :data1="sondata[1]">
        <template v-slot:title>
          <span>{{ sondataTitle[1] }}</span>
        </template>
      </little-plate>
    </div>

      <div class="littlePlate">
        <little-plate :data1="sondata[2]">
          <template v-slot:title>
            <span>{{ sondataTitle[2] }}</span>
          </template>
        </little-plate>
      </div>
      <div class="littlePlate">
        <little-plate :data1="sondata[0]">
          <template v-slot:title>
            <span>{{ sondataTitle[0] }}</span>
          </template>
        </little-plate>
      </div>
            <div class="littlePlate">
        <little-plate :data1="sondata[2]">
          <template v-slot:title>
            <span>{{ sondataTitle[2] }}</span>
          </template>
        </little-plate>
      </div>
      <div class="littlePlate">
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

<style  lang='scss' scoped>
@import 'assets/scss/normal';
@import url("./lib/main_pc.css") screen and (min-width: 768px);
@import url("./lib/main_mobile.css") screen and (max-width: 768px);
#body {
  flex-wrap: wrap;
  display: flex;
  position: relative;
  justify-content: center;
}
#extraPlate {
  display: flex;
  flex-wrap: wrap;
}
#mainPlate {
  display: flex;
  flex-wrap: wrap;
}
.littlePlate{
  position: relative;
}
</style>