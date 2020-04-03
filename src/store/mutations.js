export default {
  windowsToTop() {
    var element = document.getElementById("app");
    element.scrollIntoView({
      behavior: "smooth",
    });
  },
  changeViews(state) {
    for (let a in state.routerViews) {
      state.routerViews[a] = false;
    }
  },
  addLoginToken(state, data){
    state.loginToken = data
  },
  getuserBaseMsg(state, data){
    state.userBaseMsg = {
      id:data.id,
      nickname:data.nickname
    }
  },
  setLogin(state, data){
    state.login = data
  }
}