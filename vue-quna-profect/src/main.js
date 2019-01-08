// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Vue from 'vue'
import router from './router'
import 'assets/css/reset.css'
import 'assets/css/border.css'
import 'assets/iconfont/iconfont.css'
import FastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import 'swiper/dist/css/swiper.css'
import store from '@/store/'
/* eslint-disable*/
import babelPloyfill from 'babel-polyfill'
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1.5,
  error: 'http://img1.imgtn.bdimg.com/it/u=205820659,2044852962&fm=26&gp=0.jpg',
  loading: 'http://img3.imgtn.bdimg.com/it/u=684604423,268503144&fm=214&gp=0.jpg',
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
