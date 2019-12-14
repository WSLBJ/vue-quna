<template>
  <div>
    <div class="banner" @click="showGallary">
      <img class="banner-image" :src="bannerImg">
    </div>
    <gallary v-show="show" :imgList="imgList" @close="handleGallaryClose"></gallary>
  </div>
</template>

<script>
import Gallary from 'components/common/gallary/'
export default {
  name: 'banner',
  components: {
    Gallary
  },
  props: {
    bannerImg: String,
    imgList: Array
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    showGallary () {
      this.show = true
    },
    handleGallaryClose () {
      this.show = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .banner
    overflow: hidden
    height: 0
    padding-bottom: 55%
    .banner-image
      width: 100%
</style>
