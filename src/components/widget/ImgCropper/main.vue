<template>
  <transition name="fadeZ">
    <div id="editImgMask" v-if="isOpen">
      <div id="editImgWindow" @dblclick="exitEditImg">
        <button id="exitEditImgBtn" @click="exitEditImg">close</button>
        <div
          :style="{ width: theCropper + 'px', height: theCropper + 'px' }"
          id="selectCropper"
          v-drag2="{
            width: img.width,
            height: img.height,
            cropper: theCropper
          }"
        ></div>
        <img
          id="imgDom"
          :style="{ width: img.width + 'px', height: img.height + 'px' }"
          :src="uploadImg"
        />
        <!-- <div id="img" :style="{ 'background':'url('+ uploadImg +')', backgroundSize:'cover'}"></div> -->
        <!-- <canvas id="canvas"></canvas> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ImgCropper",
  data() {
    return {
      isOpen: false,
      img: {
        width: "",
        height: ""
      },
      theCropper: ""
    };
  },
  directives: {
    drag2: {
      bind(el, binding) {
        console.log("bind");
      },
      inserted(el, binding, vnode) {
        console.log("inserted");
        console.log(vnode)
        let odiv = el;
        let theCropper = binding.value.cropper;
        let fmaxWidth = (binding.value.width - theCropper) / 2;
        let fmaxheight = (binding.value.height - theCropper) / 2;
        console.log("1:", odiv.offsetTop);
        console.log("2:", odiv.offsetLeft);
        let minWidth = odiv.offsetLeft - fmaxWidth;
        let maxWidth = odiv.offsetLeft + fmaxWidth;
        let minheight = odiv.offsetTop - fmaxheight;
        let maxheight = odiv.offsetTop + fmaxheight;
        odiv.onmousedown = e => {
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = e => {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            if (minWidth < left && maxWidth > left) {
              odiv.style.left = left + "px";
            }
            if (minheight < top && maxheight > top) {
              odiv.style.top = top + "px";
            }
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
      update(el, binding) {
        console.log("updata");
        let odiv = el;
        let theCropper = binding.value.cropper;
        let fmaxWidth = (binding.value.width - theCropper) / 2;
        let fmaxheight = (binding.value.height - theCropper) / 2;
        console.log("1:", odiv.offsetTop);
        console.log("2:", odiv.offsetLeft);
        let minWidth = odiv.offsetLeft - fmaxWidth;
        let maxWidth = odiv.offsetLeft + fmaxWidth;
        let minheight = odiv.offsetTop - fmaxheight;
        let maxheight = odiv.offsetTop + fmaxheight;
        odiv.onmousedown = e => {
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          document.onmousemove = e => {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            if (minWidth < left && maxWidth > left) {
              odiv.style.left = left + "px";
            }
            if (minheight < top && maxheight > top) {
              odiv.style.top = top + "px";
            }
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
      componentUpdated() {
        console.log("componentUpdated");
      },
      unbind() {
        console.log("unbind");
      }
    },
    drag(el, binding) {
      let odiv = el;
      let theCropper = binding.value.cropper;
      let fmaxWidth = (binding.value.width - theCropper) / 2;
      let fmaxheight = (binding.value.height - theCropper) / 2;
      console.log("1:", odiv.offsetTop);
      console.log("2:", odiv.offsetLeft);
      let minWidth = odiv.offsetLeft - fmaxWidth;
      let maxWidth = odiv.offsetLeft + fmaxWidth;
      let minheight = odiv.offsetTop - fmaxheight;
      let maxheight = odiv.offsetTop + fmaxheight;
      odiv.onmousedown = e => {
        let disX = e.clientX - odiv.offsetLeft;
        let disY = e.clientY - odiv.offsetTop;
        document.onmousemove = e => {
          let left = e.clientX - disX;
          let top = e.clientY - disY;
          if (minWidth < left && maxWidth > left) {
            odiv.style.left = left + "px";
          }
          if (minheight < top && maxheight > top) {
            odiv.style.top = top + "px";
          }
        };
        document.onmouseup = e => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },
  props: {
    uploadImg: {
      type: [String, Blob, null, File],
      default: ""
    }
  },
  methods: {
    exitEditImg() {
      this.isOpen = false;
      let file = document.getElementById("clear");
      file.value = "";
      let cropper = document.getElementById("selectCropper");
      cropper.style.left = "unset";
      cropper.style.top = "unset";
    },
    setImg(imgData) {
      const vw = document.body.clientWidth / 2;
      const vh = document.body.clientHeight / 2;
      var img = new Image();
      const that = this;
      img.onload = function() {
        if (this.width >= this.height) {
          that.img.width = vw;
          let x = that.img.width / this.width;
          that.img.height = this.height * x;
          that.theCropper = that.img.height;
        } else {
          that.img.height = vh;
          let x = that.img.height / this.height;
          that.img.width = this.width * x;
          that.theCropper = that.img.width;
        }
      };
      img.src = imgData;
      this.uploadImg = img.src;
    }
  },
  mounted() {},
  watch: {
    isOpen(val) {
      if (val) this.setImg(this.uploadImg);
    }
  }
};
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
#exitEditImgBtn {
  position: fixed;
  top: 15px;
  right: 15px;
  width: 80px;
  height: 80px;
  color: white;
  border-radius: 40px;
  background: rgb(255, 121, 121);
  transition: all 0.3s;
}
#exitEditImgBtn:hover {
  background: rgb(236, 71, 71);
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
/* #img {
  flex: 1;
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 1;
} */
#editImgWindow img {
  position: absolute;
  z-index: 1;
}
#selectCropper {
  border-radius: 100%;
  cursor: pointer;
  border: 5px solid rgb(0, 0, 0);
  z-index: 2;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
}
/* #editImgWindow canvas {
  width: 50%;
} */
.fadeZ-enter-active,
.fadeZ-leave-active {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.fadeZ-enter,
.fadeZ-leave-to {
  opacity: 0;
  transform: translateY(-100%);
  /* position: absolute; */
}
</style>
