let theCropperOffsetLeft
let theCropperOffsetTop
let theCropperOffsetLeftZero
let theCropperOffsetTopZero
let timer_Wheel = null
let timer_Move = null
function doUpdate(el, binding, VNode) {
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
    if (timer_Wheel) clearTimeout(timer_Wheel)
    timer_Wheel = setTimeout(() => {
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
        if (
          //临界
          top > imgOffsetTop + scrollSetting &&
          top + width < imgOffsetTopMax - scrollSetting &&
          left > imgOffsetLeft + scrollSetting &&
          left + width < imgOffsetLeftMax - scrollSetting &&
          nowWidth < cropperMaxSize &&
          event.wheelDelta > 0
        ) {
          nowWidth += scrollSetting
          el.style.width = nowWidth + 'px'
          el.style.height = nowWidth + 'px'
          el.style.left = el.offsetLeft - scrollSetting / 2 + 'px'
          el.style.top = el.offsetTop - scrollSetting / 2 + 'px'
          theCropperOffsetLeft = el.offsetLeft
          theCropperOffsetTop = el.offsetTop
        } else {
          //处理临界
          if (event.wheelDelta > 0 && nowWidth < cropperMaxSize) {
            nowWidth += scrollSetting
            //左
            if (
              left <= imgOffsetLeft + scrollSetting &&
              el.style.left != imgOffsetLeft + 'px'
            ) {
              el.style.left = imgOffsetLeft + 'px'
            }
            //顶
            if (
              top <= imgOffsetTop + scrollSetting &&
              el.style.top != imgOffsetTop + 'px'
            ) {
              el.style.top = imgOffsetTop + 'px'
            }
            //右
            if (
              left >= imgOffsetLeftMax - scrollSetting - width &&
              el.style.left != imgOffsetLeftMax - width + 'px'
            ) {
              el.style.left = imgOffsetLeftMax - width + 'px'
            }
            //底
            if (
              top >= imgOffsetTopMax - scrollSetting - width &&
              el.style.top != imgOffsetTopMax - width + 'px'
            ) {
              el.style.top = imgOffsetTopMax - width + 'px'
            }
            el.style.width = nowWidth + 'px'
            el.style.height = nowWidth + 'px'
            if (
              parseInt(el.style.top) >
              imgOffsetTopMax - parseInt(el.style.width)
            ) {
              el.style.top = imgOffsetTopMax - parseInt(el.style.width) + 'px'
            }
            if (
              parseInt(el.style.left) >
              imgOffsetLeftMax - parseInt(el.style.width)
            ) {
              el.style.left = imgOffsetLeftMax - parseInt(el.style.width) + 'px'
            }
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
        }
      }
    })
  }
  odiv.onmouseenter = e => {
    if (timer_Move) clearTimeout(timer_Move)
    window.onmousewheel = wheel
  }
  odiv.onmouseleave = e => {
    if (timer_Wheel) clearTimeout(timer_Wheel)
    window.onmousewheel = null
  }
  odiv.onmousedown = e => {
    window.onmousewheel = null
    if (timer_Wheel) clearTimeout(timer_Wheel)
    if (timer_Move) clearTimeout(timer_Move)
    timer_Move = setTimeout(() => {
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
    })
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
