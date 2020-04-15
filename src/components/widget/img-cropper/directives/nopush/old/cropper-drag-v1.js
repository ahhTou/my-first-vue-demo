let theCropperOffsetLeft
let theCropperOffsetTop
function doUpdate(el, binding) {
  const odiv = el
  const imgWidth = binding.value.width
  const imgHeight = binding.value.height
  const cropperMaxSize = parseInt(el.style.width)
  const cropperMinSize = 100
  //判断是否为第一次打开图片
  if (odiv.style.left) {
    odiv.style.left = odiv.offsetLeft + 'px'
    odiv.style.top = odiv.offsetTop + 'px'
  }
  //滚动事件
  function wheel(event) {
    let el = event.target
    let nowWidth = parseInt(el.style.width)
    const scrollSetting = 40
    if (event.wheelDelta) {
      if (event.wheelDelta > 0 && nowWidth < cropperMaxSize) {
        nowWidth += scrollSetting
        el.style.width = nowWidth + 'px'
        el.style.height = nowWidth + 'px'
        el.style.left = el.offsetLeft - scrollSetting / 2 + 'px'
        el.style.top = el.offsetTop - scrollSetting / 2 + 'px'
        theCropperOffsetLeft = el.offsetLeft
        theCropperOffsetTop = el.offsetTop
      }
      if (event.wheelDelta < 0 && nowWidth > cropperMinSize) {
        nowWidth -= scrollSetting
        el.style.width = nowWidth + 'px'
        el.style.height = nowWidth + 'px'
        el.style.left = el.offsetLeft + scrollSetting / 2 + 'px'
        el.style.top = el.offsetTop + scrollSetting / 2 + 'px'
        theCropperOffsetLeft = el.offsetLeft
        theCropperOffsetTop = el.offsetTop
      }
    }
  }
  odiv.onmouseenter = e => {
    window.onmousewheel = wheel
  }
  odiv.onmouseleave = e => {
    document.onmousemove = null
    document.onmouseup = null
    window.onmousewheel = null
  }
  odiv.onmousedown = e => {
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
  inserted(el, binding) {
    doUpdate(el, binding)
  },
  update(el, binding) {
    theCropperOffsetLeft = el.offsetLeft
    theCropperOffsetTop = el.offsetTop
    doUpdate(el, binding)
  }
}