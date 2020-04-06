import Toast from './toast.vue'
Toast.install = function(Vue, options){
  const Constructor = Vue.extend(Toast)
  Vue.prototype.$toast = (options={}) => {
    var instance = new Constructor().$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
  }
}


export default Toast