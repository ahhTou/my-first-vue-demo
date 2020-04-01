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
  }
}