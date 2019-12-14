export default {
  changeCity (state, city) {
    try {
      localStorage.city = city
    } catch (e) {}
    state.city = city
  },
  changeDownload (state, flag) {
    if (!flag) {
      try {
        localStorage.download = true
      } catch (e) {}
    }
    state.showDownload = flag
  }
}
