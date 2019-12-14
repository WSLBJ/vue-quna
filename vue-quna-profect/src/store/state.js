export default {
  city: localStorage.city || '北京',
  showDownload: localStorage ? (!localStorage.download) : true
}
