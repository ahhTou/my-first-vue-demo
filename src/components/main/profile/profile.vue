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
            <button class="btnEdit" @click="changeEdit" v-show="!isEdit">
              编辑
            </button>
            <button class="btnEdit" @click="edit" v-show="isEdit">完成</button>
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

<style lang="scss" scoped>
@import url('~assets/css/base.css');
@import './css/main';
</style>
