import Toast from './toast.vue'
let instance = false
let timer = null
Toast.install = function(Vue) {
  Vue.prototype.$toast = (text, timeOut) => {
    if (!timeOut) timeOut = 5000
    //如果instance不是false则 仅更改text，并且重置timeOut
    if (instance) {
      instance._data.message = text
      clearTimeout(timer)
      timer = setTimeout(() => {
        instance.changeShow()
        instance = false
      }, timeOut)
      instance.changeInstance(function() {
        instance = false
        instance = create(Vue, text)
      })
    } else {
      instance = create(Vue, text)
      clearTimeout(timer)
      timer = setTimeout(() => {
        instance.changeShow()
        instance = false
      }, timeOut)
    }
  }
}
function create(Vue, text) {
  const Constructor = Vue.extend(Toast)
  const toast = new Constructor({
    data() {
      return {
        message: text
      }
    }
  }).$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  return toast
}

export default Toast
