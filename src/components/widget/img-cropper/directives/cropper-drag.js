let theCropperOffsetLeft,
  theCropperOffsetTop,
  theCropperOffsetLeftZero,
  theCropperOffsetTopZero,
  timer_Wheel = null,
  timer_Move = null
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
      const scrollSetting = 20
      const imgDiv = document.getElementById('imgDom')
      const imgOffsetTop = imgDiv.offsetTop
      const imgOffsetLeft = imgDiv.offsetLeft
      const imgOffsetTopMax = imgOffsetTop + imgHeight
      const imgOffsetLeftMax = imgOffsetLeft + imgWidth
      let nowWidth = parseInt(odiv.style.width)
      if (event.wheelDelta) {
        const top = odiv.offsetTop
        const left = odiv.offsetLeft
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
          odiv.style.width = nowWidth + 'px'
          odiv.style.height = nowWidth + 'px'
          odiv.style.left = odiv.offsetLeft - scrollSetting / 2 + 'px'
          odiv.style.top = odiv.offsetTop - scrollSetting / 2 + 'px'
          theCropperOffsetLeft = odiv.offsetLeft
          theCropperOffsetTop = odiv.offsetTop
        } else {
          //处理临界
          if (event.wheelDelta > 0 && nowWidth < cropperMaxSize) {
            nowWidth += scrollSetting
            //左
            if (
              left <= imgOffsetLeft + scrollSetting &&
              odiv.style.left != imgOffsetLeft + 'px'
            ) {
              odiv.style.left = imgOffsetLeft + 'px'
            }
            //顶
            if (
              top <= imgOffsetTop + scrollSetting &&
              odiv.style.top != imgOffsetTop + 'px'
            ) {
              odiv.style.top = imgOffsetTop + 'px'
            }
            //右
            if (
              left >= imgOffsetLeftMax - scrollSetting - width &&
              odiv.style.left != imgOffsetLeftMax - width + 'px'
            ) {
              odiv.style.left = imgOffsetLeftMax - width + 'px'
            }
            //底
            if (
              top >= imgOffsetTopMax - scrollSetting - width &&
              odiv.style.top != imgOffsetTopMax - width + 'px'
            ) {
              odiv.style.top = imgOffsetTopMax - width + 'px'
            }
            odiv.style.width = nowWidth + 'px'
            odiv.style.height = nowWidth + 'px'
            if (
              parseInt(odiv.style.top) >
              imgOffsetTopMax - parseInt(odiv.style.width)
            ) {
              odiv.style.top =
                imgOffsetTopMax - parseInt(odiv.style.width) + 'px'
            }
            if (
              parseInt(odiv.style.left) >
              imgOffsetLeftMax - parseInt(odiv.style.width)
            ) {
              odiv.style.left =
                imgOffsetLeftMax - parseInt(odiv.style.width) + 'px'
            }
          }
        }

        if (event.wheelDelta < 0 && nowWidth > cropperMinSize) {
          nowWidth -= scrollSetting
          odiv.style.width = nowWidth + 'px'
          odiv.style.height = nowWidth + 'px'
          odiv.style.left = odiv.offsetLeft + scrollSetting / 2 + 'px'
          odiv.style.top = odiv.offsetTop + scrollSetting / 2 + 'px'
          theCropperOffsetLeft = odiv.offsetLeft
          theCropperOffsetTop = odiv.offsetTop
        }
      }
    })
  }
  odiv.onmouseenter = e => {
    if (timer_Move) clearTimeout(timer_Move)
    window.onmousewheel = wheel
  }
  odiv.onmouseleave = e => {
    window.onmousewheel = null
    if (timer_Wheel) clearTimeout(timer_Wheel)
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
