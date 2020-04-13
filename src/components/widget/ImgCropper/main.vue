<template>
  <transition name="fadeZ">
    <div
      id="editImgMask"
      v-if="isOpen"
      @touchmove.prevent.stop
      @mousewheel.prevent
    >
      <transition name="fadeX">
        <div
          id="editImgWindow"
          v-show="isEdit"
          :style="{
            width: windowsWidth + 'px',
            height: windwosHeight + 'px',
            transform: ' scale(' + autoChange + ')'
          }"
        >
          <div id="btnLine">
            <button class="cricleBtn exitBtn" @click="exitEditImg">
              close
            </button>
            <button class="cricleBtn cropperBtn" @click="cropperCoef">
              裁剪
            </button>
          </div>
          <div
            id="selectCropper"
            :style="{
              width: theCropper + 'px',
              height: theCropper + 'px'
            }"
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
      </transition>
      <transition name="fadeX">
        <div id="cropperResWindow" v-show="!isEdit">
          <img :src="theCropperImg" />
          <div id="rectBtnLine">
            <button class="cropperBtn rectBtn" @click="completeCropper">
              完成
            </button>
            <button @click="exitEditImg" class="exitBtn rectBtn">
              取消
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
//v0.1.3
import drag from './directives/cropper-drag'
function res() {}
export default {
  name: 'ImgCropper',
  data() {
    return {
      isOpen: false,
      isEdit: true,
      img: {
        width: '',
        height: ''
      },
      rawImg: {
        width: '',
        height: ''
      },
      canvasData: '',
      theCropper: '',
      theCropperImg: '',
      autoChange: 1,
      windowsWidth: '',
      windwosHeight: ''
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
      this.isEdit = true
      this.isOpen = false
      let file = document.getElementById('clear')
      file.value = ''
      let cropper = document.getElementById('selectCropper')
      cropper.style.left = 'unset'
      cropper.style.top = 'unset'
      cropper.style.width = this.theCropper + 'px'
      cropper.style.height = this.theCropper + 'px'
    },
    setImg(imgData) {
      let that = this
      let img = new Image()
      img.onload = function() {
        let vw = window.innerWidth
        let vh = window.innerHeight
        if (vw > vh) {
          vw = vw / 3
          vh = vh / 1.5
        } else {
          vw = vw / 1.5
          vh = vh / 2
        }
        if (this.width >= this.height) {
          that.img.width = vw
          let x = this.height / this.width
          that.img.height = that.img.width * x
          that.theCropper = that.img.height
        } else {
          that.img.height = vh
          let x = this.width / this.height
          that.img.width = that.img.height * x
          that.theCropper = that.img.width
        }
        that.rawImg.width = this.width
        that.rawImg.height = this.height
        if (vw > vh) {
          that.windowsWidth = that.img.width * 1.3
          that.windwosHeight = that.img.height * 1.3
        } else {
          that.windowsWidth = that.img.width * 1.2
          that.windwosHeight = that.img.height * 1.2
        }
      }
      img.src = imgData
      this.uploadImg = img.src
      this.canvasData = img
    },
    completeCropper() {
      this.$options
      this.isOpen = false
      this.isEdit = true
      let file = document.getElementById('clear')
      file.value = ''
      let cropper = document.getElementById('selectCropper')
      cropper.style.left = 'unset'
      cropper.style.top = 'unset'
      cropper.style.width = this.theCropper + 'px'
      cropper.style.height = this.theCropper + 'px'
      res(this.theCropperImg)
    },
    open(callback) {
      this.isOpen = !this.isOpen
      res = callback
    }
  },
  computed: {
    cropperImg(coefWidth, coefHeight, coefSize) {
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
      this.theCropperImg = image.src
      this.isEdit = false
      // new Promise((reslove, reject) => {
      //   canvas.toBlob(blob => {
      //     const url = URL.createObjectURL(blob)
      //     const res = {
      //       url,
      //       blob
      //     }
      //     reslove(res)
      //   })
      // }).then(res => {
      //   this.theCropperImg = res.url
      //   this.isEdit = false
      // })
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.setImg(this.uploadImg)
        const width = document.body.clientWidth
        const height = document.body.clientHeight
        window.onresize = () => {
          this.$toast('裁剪中改变窗口大小会导致裁剪失败')
          let newWidth = document.body.clientWidth
          let newHeight = document.body.clientHeight
          let w = newWidth / width
          let h = newHeight / height
          let x = w < h ? w : h
          if (x < 1) {
            this.autoChange = 1 * x
          }
        }
      }
      if (!val) {
        window.onresize = null
        this.autoChange = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './css/fade.css';
@import './css/main.scss';
</style>
