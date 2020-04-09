<template>
  <transition name="fadeZ">
    <div id="editImgMask" v-if="isOpen">
      <div id="editImgWindow">
        <div id="btnLine">
          <button class="cricleBtn" id="exitBtn" @click="exitEditImg">
            close
          </button>
          <button class="cricleBtn" id="cropperBtn" @click="cropperCoef">
            裁剪
          </button>
        </div>
        <div
          :style="{ width: theCropper + 'px', height: theCropper + 'px' }"
          id="selectCropper"
          v-drag="{
            width: img.width,
            height: img.height,
            cropper: theCropper
          }"
        ></div>
        <img
          id="imgDom"
          draggable="false"
          :style="{
            width: img.width + 'px',
            height: img.height + 'px'
          }"
          :src="uploadImg"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import drag from './directives/cropper-drag'
export default {
  name: 'ImgCropper',
  data() {
    return {
      isOpen: false,
      img: {
        width: '',
        height: ''
      },
      rawImg: {
        width: '',
        height: ''
      },
      canvasData: '',
      theCropper: ''
    }
  },
  directives: {
    drag
  },
  props: {
    uploadImg: {
      type: [String, Blob, null, File],
      default: ''
    }
  },
  methods: {
    cropperCoef() {
      const img = document.getElementById('imgDom')
      const cropper = document.getElementById('selectCropper')
      const imgOffsetTop = img.offsetTop
      const imgOffsetLeft = img.offsetLeft
      const imgWidth = parseInt(img.style.width)
      const imgHeight = parseInt(img.style.height)
      const cropperOffsetTop = cropper.offsetTop
      const cropperOffsetLeft = cropper.offsetLeft
      const cropperSize = parseInt(cropper.style.width)
      //系数
      const coefWidth = (cropperOffsetLeft - imgOffsetLeft) / imgWidth
      const coefHeight = (cropperOffsetTop - imgOffsetTop) / imgHeight
      const coefSize = cropperSize / imgWidth
      this.$options.computed.cropperImg.bind(this)(
        coefWidth,
        coefHeight,
        coefSize
      )
    },

    exitEditImg() {
      this.isOpen = false
      //清空文件表单
      let file = document.getElementById('clear')
      file.value = ''
      let cropper = document.getElementById('selectCropper')
      cropper.style.left = 'unset'
      cropper.style.top = 'unset'
      cropper.style.width = this.theCropper + 'px'
      cropper.style.height = this.theCropper + 'px'
    },
    setImg(imgData) {
      const vw = document.body.clientWidth / 2
      const vh = document.body.clientHeight / 2
      let img = new Image()
      const that = this
      img.onload = function() {
        if (this.width >= this.height) {
          that.img.width = vw
          let x = that.img.width / this.width
          that.img.height = this.height * x
          that.theCropper = that.img.height
        } else {
          that.img.height = vh
          let x = that.img.height / this.height
          that.img.width = this.width * x
          that.theCropper = that.img.width
        }
        that.rawImg.width = this.width
        that.rawImg.height = this.height
      }
      console.log(img)
      img.src = imgData
      this.uploadImg = img.src
      this.canvasData = img
    }
  },
  computed: {
    cropperImg(coefWidth, coefHeight, coefSize) {
      console.log(coefWidth, coefHeight, coefSize)
      // console.log(this.uploadImg)
      // console.log(this.rawImg.width)
      // console.log(this.rawImg.height)
      const widthGo = this.rawImg.width * coefWidth
      const heightGO = this.rawImg.height * coefHeight
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.height = canvas.width = this.rawImg.width * coefSize
      const theImg = ctx.drawImage(
        this.canvasData,
        widthGo,
        heightGO,
        canvas.height,
        canvas.height,
        0,
        0,
        canvas.height,
        canvas.height
      )
      var image = new Image()
      image.src = canvas.toDataURL('image/png')
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.setImg(this.uploadImg)
      }
    }
  }
}
</script>

<style scoped>
#editImgMask {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
}
#btnLine {
  position: fixed;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
}
.cricleBtn {
  width: 80px;
  height: 80px;
  color: white;
  border-radius: 40px;
  margin: 10px;

  transition: all 0.3s;
}
#exitBtn {
  background: rgb(255, 121, 121);
}
#exitBtn:hover {
  background: rgb(236, 71, 71);
}
#cropperBtn {
  background: rgb(94, 158, 255);
}
#cropperBtn:hover {
  background: rgb(51, 133, 255);
}
#editImgWindow {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 20px 20px 40px #aaa;
}
#editImgWindow img {
  /* position: absolute; */
  z-index: 1;
  user-select: none;
}
#selectCropper {
  /* border-radius: 100%; */
  cursor: pointer;
  border: 1px solid rgb(0, 0, 0);
  z-index: 2;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
}
.fadeZ-enter-active,
.fadeZ-leave-active {
  transition: all 0.5s;
}

.fadeZ-enter,
.fadeZ-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  position: absolute;
}
</style>
