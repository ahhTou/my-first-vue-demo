export default {
  drag(el, binding) {
    console.log('123')
    document.addEventListener('mousewheel', function (event) {
      console.log(event.wheelDelta > 0)
    }, false)
    let odiv = el;
    let theCropper = binding.value.cropper;
    let fmaxWidth = (binding.value.width - theCropper) / 2;
    let fmaxheight = (binding.value.height - theCropper) / 2;
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
}