<template>
  <div>
    <wrapper>
      <template v-slot:title>个人档案</template>
      <template v-slot:main>
        <div id="slotContent">
          <div id="header">
            <input
              type="file"
              class="profilePhoto"
              @change="changePhoto"
              v-show="isEdit"
              :style="style"
            />
            <div class="profilePhoto" :style="style" />
            <div id="headerTitle">
              <input
                type="text"
                name="nickname"
                id="nickname"
                v-show="isEdit"
                v-model="msg.nickname"
              />
              <div class="nickname" v-show="!isEdit">{{ msg.nickname }}</div>
              <div class="id">{{ msg.id }}</div>
            </div>
          </div>
          <div id="center"></div>
          <div id="footer">
            <button id="btnEdit" @click="changeEdit" v-show="!isEdit">编辑</button>
            <button id="btnEdit" @click="edit" v-show="isEdit">完成</button>
          </div>
        </div>
      </template>
    </wrapper>
    <transition name="fade">
      <div id="editImgWindow" v-if="isOpen">
        <img :src="uploadImg">
      </div>
    </transition>
  </div>
</template>

<script>
import wrapper from "./wrapper";
export default {
  name: "profie",
  data() {
    return {
      style: "",
      msg: {
        id: "id 未加载",
        nickname: "nickname 未加载",
        profilePhoto: ""
      },
      uploadImg:"",
      isEdit: false,
      isOpen: false
    };
  },
  methods: {
    changeEdit() {
      this.isEdit = !this.isEdit;
    },
    changePhoto() {
      var formData = new FormData();
      this.uploadImg = window.URL.createObjectURL(
        document.querySelector("input[type=file]").files[0]
      );
      this.isOpen = true
      console.log(imgUrl);
      this.msg.profilePhoto = imgUrl;
      console.log("idoooo");
      formData.append(
        "userfile",
        document.querySelector("input[type=file]").files[0]
      );
    },
    edit() {}
  },
  components: {
    wrapper
  },
  created() {
    this.msg = this.$store.getters.getUserBaseMsg;
  },
  mounted() {
    this.msg = this.$store.getters.getUserBaseMsg;
  },
  computed: {
    thisMsg() {
      return this.$store.getters.getUserBaseMsg;
    }
  },
  watch: {
    thisMsg() {
      this.msg = this.$store.getters.getUserBaseMsg;
    },
    msg(val) {
      this.style = {
        backgroundImage: "url(" + this.msg.profilePhoto + ")",
        backgroundSize: "cover"
      };
    }
  }
};
</script>


<style scoped>
@import url("~views/lib/fade.css");
.id {
  align-self: stretch;
  font-size: 20px;
}
.nickname {
  width: 100%;
  color: #d3515b;
  font-size: 25px;
  margin: 0 0 10px 0;
  border: 1px solid rgba(254, 255, 255, 0);
}
#nickname {
  width: 100%;
  color: #d3515b;
  font-size: 25px;
  margin: 0 0 10px 0;
  outline: none;
  border: 1px solid #aaa;
}
input[type="file"] {
  opacity: 0;
  position: absolute;
}
input {
  outline: none;
  border: 1px solid #aaa;
  padding: 0;
}
#slotContent {
  width: 100%;
  display: flex;
  flex-direction: column;
}
#header {
  display: flex;
}
#headerTitle {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.profilePhoto {
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border: 1px solid #aaa;
}
#center {
  flex: 1;
}
#footer {
  width: 100%;
  display: flex;
  justify-content: center;
}
#btnEdit {
  font-size: 20px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  outline: none;
  border: none;
  transition: all 0.3s;
  background: rgb(222, 225, 230, 0.6);
  margin: 2%;
}
#btnEdit:hover {
  background: rgb(222, 225, 230);
}
#editImgWindow {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  background: black;
  box-shadow: 10px 10px 20px #aaa;
  transform: translate(-50%, -50%);
}
</style>