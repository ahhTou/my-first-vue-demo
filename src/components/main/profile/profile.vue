<template>
  <div>
    <wrapper>
      <template #title>个人档案</template>
      <template #main>
        <div id="content">
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
            <button class="btnEdit" @click="submit" v-show="isEdit">
              完成
            </button>
          </div>
        </div>
      </template>
    </wrapper>
    <img-cropper :uploadImg="uploadImg" ref="cropper"></img-cropper>
  </div>
</template>

<script>
import wrapper from './wrapper'
import imgCropper from 'components/widget/img-cropper/ImgCropper.vue'
import isEqual from 'assets/js/isEqual.js'
import { setAccountBaseMsg } from 'network/accountMsg.js'
export default {
  name: 'profie',
  components: {
    wrapper,
    imgCropper
  },
  data() {
    return {
      style: '',
      msg: {
        id: 'id 未加载',
        nickname: 'nickname 未加载',
        profilePhoto: ''
      },
      old_msg: '',
      uploadImg: '',
      isEdit: false,
      photoIsChange: false
    }
  },
  methods: {
    changeEdit() {
      this.isEdit = true
    },
    changePhoto() {
      let file = document.querySelector('input[type=file]').files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.uploadImg = reader.result
        const _this = this
        this.$refs.cropper.open(res => {
          _this.isEdit = true
          _this.msg.profilePhoto = res
          _this.photoIsChange = true
        })
      }
    },
    submit() {
      let profilePhoto
      if (
        (!isEqual(this.old_msg, this.msg) || this.photoIsChange) &&
        (this.msg.nickname !== '' || this.msg.nickname !== null)
      ) {
        if (!this.photoIsChange) {
          profilePhoto = this.msg.profilePhoto
          delete this.msg.profilePhoto
        }
        setAccountBaseMsg(this.msg).then(res => {
          const code = res.data
          switch (code) {
            case 0:
              this.$toast('档案更新失败，更新后台时出现问题')
              break
            case -1:
              this.$toast('档案更新失败，写入头像时出现异常')
              break
            case -2:
              this.$toast('档案更新失败，写入头像时捕捉到异常')
              break
            case 1:
              this.$toast('档案更新成功')
              if (!this.photoIsChange) {
                this.msg.profilePhoto = profilePhoto
              }
              this.$store.commit('setUserBaseMsg', this.msg)
              this.photoIsChange = false
              this.isEdit = false
              break
            default:
              this.$toast('档案可能没有更新')
          }
        })
      } else {
        this.$toast('档案未改变')
        this.isEdit = false
      }
    }
  },

  created() {
    this.msg = this.$store.getters.getUserBaseMsg
    this.old_msg = this.msg
  },
  mounted() {
    this.msg = this.$store.getters.getUserBaseMsg
    this.old_msg = this.msg
  },
  computed: {
    thisMsg() {
      return this.$store.state.userBaseMsg
    }
  },
  watch: {
    thisMsg: {
      handler() {
        this.msg = this.$store.getters.getUserBaseMsg
      },
      immediate: true,
      deep: true
    },
    msg: {
      handler() {
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
@mixin ncikname($opacity) {
  padding-left: 5px;
  color: $color_pink;
  font-size: 25px;
  margin: 0 0 10px 0;
  border: 1px solid rgba(170, 170, 170, $opacity);
}
$color_pink: #d3515b;
input[type='file'] {
  opacity: 0;
  position: absolute;
}
input {
  outline: none;
  border: 1px solid #aaa;
  padding: 0;
}

#content {
  width: 100%;
  display: flex;
  flex-direction: column;
  #header {
    display: flex;
    .profilePhoto {
      cursor: pointer;
      $width: 100px;
      width: $width;
      height: $width;
      border-radius: $width/2;
    }
    #headerTitle {
      width: 250px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .nickname {
        @include ncikname(0);
      }
      #nickname {
        @include ncikname(1);
      }
      .id {
        padding-left: 5px;
        align-self: stretch;
        font-size: 20px;
      }
    }
  }
  #center {
    flex: 1;
  }
  #footer {
    width: 100%;
    display: flex;
    justify-content: center;
    .btnEdit {
      flex: 1;
      height: 50px;
      outline: none;
      border: none;
      font-size: 20px;
      border-radius: 5px;
      transition: all 0.3s;
      background: rgba(222, 225, 230, 0.8);
      margin: 2%;
      &:hover {
        background: rgb(222, 225, 230);
      }
    }
  }
}
</style>
