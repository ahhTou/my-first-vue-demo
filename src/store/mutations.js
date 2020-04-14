export default {
  windowsToTop() {
    var element = document.getElementById('app')
    element.scrollIntoView({
      behavior: 'smooth'
    })
  },
  changeViews(state) {
    for (let a in state.routerViews) {
      state.routerViews[a] = false
    }
  },
  setUserBaseMsg(state, data) {
    state.login = true
    state.userBaseMsg = {
      id: data.id,
      nickname: data.nickname,
      profilePhoto: data.profilePhoto
    }
  },
  setLogin(state, data) {
    state.login = true
    state.loginToken = data
  },
  closeLogin(state) {
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('login', false)
    window.localStorage.setItem('rememberMe', false)
    state.loginToken = ''
    state.login = false
  }
}
