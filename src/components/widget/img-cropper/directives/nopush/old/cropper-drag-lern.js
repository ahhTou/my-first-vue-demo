export default 
  {
    bind(el, binding) {
      console.log("bind");
    },
    inserted(el, binding, vnode) {
      console.log("inserted");
      console.log(vnode);
      let odiv = el;
      let theCropper = binding.value.cropper;
      let fmaxWidth = (binding.value.width - theCropper) / 2;
      let fmaxheight = (binding.value.height - theCropper) / 2;
      console.log("in 1:", odiv.offsetTop);
      console.log("in 2:", odiv.offsetLeft);
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
      console.log("up 1:", odiv.offsetTop);
      console.log("up 2:", odiv.offsetLeft);
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
  }