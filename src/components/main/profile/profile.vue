<template>
  <div>
    <wrapper>
      <template v-slot:title>个人档案</template>
      <template v-slot:main>
        <div id="slotContent">
          <div id="header">
            <input
              id="clear"
              type="file"
              class="profilePhoto"
              @input="changePhoto"
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
            <button id="btnEdit" @click="changeEdit" v-show="!isEdit">
              编辑
            </button>
            <button id="btnEdit" @click="edit" v-show="isEdit">完成</button>
          </div>
        </div>
      </template>
    </wrapper>
    <img-cropper :uploadImg="uploadImg" ref="cropper"></img-cropper>
  </div>
</template>

<script>
import wrapper from './wrapper'
import imgCropper from 'components/widget/ImgCropper/main.vue'
export default {
  name: 'profie',
  data() {
    return {
      style: '',
      msg: {
        id: 'id 未加载',
        nickname: 'nickname 未加载',
        profilePhoto: ''
      },
      uploadImg: '',
      isEdit: false
    }
  },
  methods: {
    changeEdit() {
      this.isEdit = !this.isEdit
    },
    changePhoto() {
      this.isEdit = !this.isEdit
      let file = document.querySelector('input[type=file]').files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.uploadImg = reader.result
        const _this = this
        this.$refs.cropper.open(res => {
          _this.msg.profilePhoto = res
        })
      }
    },
    edit() {}
  },
  components: {
    wrapper,
    imgCropper
  },
  created() {
    this.msg = this.$store.getters.getUserBaseMsg
  },
  mounted() {
    this.msg = this.$store.getters.getUserBaseMsg
  },
  computed: {
    thisMsg() {
      return this.$store.state.userBaseMsg
    }
  },
  watch: {
    thisMsg: {
      handler() {
        console.log('123')
        this.msg = this.$store.getters.getUserBaseMsg
      },
      immediate: true,
      deep: true
    },
    msg: {
      handler(newName, oldName) {
        console.log('321')
        this.style = {
          backgroundImage: 'url(' + this.msg.profilePhoto + ')',
          backgroundSize: 'cover'
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
@import url('~assets/css/base.css');
.id {
  padding-left: 5px;
  align-self: stretch;
  font-size: 20px;
}
.nickname {
  padding-left: 5px;
  width: 100%;
  color: #d3515b;
  font-size: 25px;
  margin: 0 0 10px 0;
  border: 1px solid rgba(254, 255, 255, 0);
}
#nickname {
  padding-left: 5px;
  width: 100%;
  color: #d3515b;
  font-size: 25px;
  margin: 0 0 10px 0;
  outline: none;
  border: 1px solid #aaa;
}
input[type='file'] {
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
</style>
