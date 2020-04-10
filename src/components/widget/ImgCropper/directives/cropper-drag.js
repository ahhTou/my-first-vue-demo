let theCropperOffsetLeft
let theCropperOffsetTop
let theCropperOffsetLeftZero
let theCropperOffsetTopZero
function doUpdate(el, binding, VNode) {
  const _this = VNode.context
  const odiv = el
  const imgWidth = binding.value.width
  const imgHeight = binding.value.height
  const cropperMaxSize = parseInt(el.style.width)
  const cropperMinSize = 50
  //判断是否为第一次打开图片
  if (odiv.style.left) {
    odiv.style.left = odiv.offsetLeft + 'px'
    odiv.style.top = odiv.offsetTop + 'px'
  }
  //滚动事件
  function wheel(event) {
    let el = odiv
    let nowWidth = parseInt(el.style.width)
    const scrollSetting = 20
    const imgDiv = document.getElementById('imgDom')
    const imgOffsetTop = imgDiv.offsetTop
    const imgOffsetLeft = imgDiv.offsetLeft
    const imgOffsetTopMax = imgOffsetTop + imgHeight
    const imgOffsetLeftMax = imgOffsetLeft + imgWidth
    if (event.wheelDelta) {
      const top = el.offsetTop
      const left = el.offsetLeft
      let width = parseInt(odiv.style.width)
      if (left > imgOffsetLeft + scrollSetting) {
        console.log('最左')
      }
      if (top > imgOffsetTop + scrollSetting) {
        console.log('最顶')
      }
      if (top + width < imgOffsetTopMax - scrollSetting) {
        console.log('最底')
      }
      if (left + width < imgOffsetLeftMax - scrollSetting) {
        console.log('追右')
      }

      if (
        top > imgOffsetTop + scrollSetting &&
        top + width < imgOffsetTopMax - scrollSetting &&
        left > imgOffsetLeft + scrollSetting &&
        left + width < imgOffsetLeftMax - scrollSetting
      ) {
        if (event.wheelDelta > 0 && nowWidth < cropperMaxSize) {
          nowWidth += scrollSetting
          el.style.width = nowWidth + 'px'
          el.style.height = nowWidth + 'px'
          el.style.left = el.offsetLeft - scrollSetting / 2 + 'px'
          el.style.top = el.offsetTop - scrollSetting / 2 + 'px'
          theCropperOffsetLeft = el.offsetLeft
          theCropperOffsetTop = el.offsetTop
        }
      }
      if (event.wheelDelta < 0 && nowWidth > cropperMinSize) {
        nowWidth -= scrollSetting
        el.style.width = nowWidth + 'px'
        el.style.height = nowWidth + 'px'
        el.style.left = el.offsetLeft + scrollSetting / 2 + 'px'
        el.style.top = el.offsetTop + scrollSetting / 2 + 'px'
        theCropperOffsetLeft = el.offsetLeft
        theCropperOffsetTop = el.offsetTop
      } else {
        el.style.width = cropperMaxSize + 'px'
        el.style.height = cropperMaxSize + 'px'
        el.style.left = theCropperOffsetLeftZero + 'px'
        el.style.top = theCropperOffsetTopZero + 'px'
        _this.$toast('已还原裁剪框')
      }
    }
  }
  odiv.onmouseenter = e => {
    window.onmousewheel = wheel
  }
  odiv.onmousedown = e => {
    window.onmousewheel = null
    const imgDiv = document.getElementById('imgDom')
    const imgOffsetTop = imgDiv.offsetTop
    const imgOffsetLeft = imgDiv.offsetLeft
    const imgOffsetTopMax = imgOffsetTop + imgHeight
    const imgOffsetLeftMax = imgOffsetLeft + imgWidth
    let disX = e.clientX - odiv.offsetLeft
    let disY = e.clientY - odiv.offsetTop
    document.onmousemove = e => {
      let left = e.clientX - disX
      let top = e.clientY - disY
      let width = parseInt(odiv.style.width)
      if (top > imgOffsetTop && top + width < imgOffsetTopMax)
        odiv.style.top = top + 'px'
      if (left > imgOffsetLeft && left + width < imgOffsetLeftMax)
        odiv.style.left = left + 'px'
    }
    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null
      window.onmousewheel = wheel
    }
  }
}
export default {
  inserted(el, binding, vnode) {
    doUpdate(el, binding, vnode)
  },
  update(el, binding, vnode) {
    theCropperOffsetLeft = el.offsetLeft
    theCropperOffsetTop = el.offsetTop
    theCropperOffsetLeftZero = el.offsetLeft
    theCropperOffsetTopZero = el.offsetTop
    doUpdate(el, binding, vnode)
  }
}
