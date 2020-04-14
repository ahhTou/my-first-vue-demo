import { getAccountBaseMsg } from 'network/accountMsg.js'
export default function getData(_this){
  getAccountBaseMsg().then(res => {
    if (res.data !== 'err') {
      _this.$store.commit('setUserBaseMsg', res.data)
    } else {
      _this.$store.commit('closeLogin')
    }
  })
}
