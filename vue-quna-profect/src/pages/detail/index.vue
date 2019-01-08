<template>
  <div>
    <banner :bannerImg="bannerImg" :imgList="imgList"></banner>
  </div>
</template>

<script>
import Banner from './banner'
import axios from 'axios'
export default {
  name: 'detail',
  components: {
    Banner
  },
  props: {
    sightId: [Number, String]
  },
  data () {
    return {
      bannerImg: '',
      imgList: []
    }
  },
  created () {
    this.getDetailInfo()
  },
  watch: {
    sightId () {
      if (this.sightId) {
        this.getDetailInfo()
      }
    }
  },
  methods: {
    getDetailInfo () {
      axios.get('/api/detail.json', {
        params: {
          id: this.sightId
        }
      }).then(this.handleGetDetailSucc.bind(this)).catch(this.handleGetDetailErr.bind(this))
    },
    handleGetDetailSucc (res) {
      res && (res = res.data)
      if (res && res.ret && res.data) {
        this.bannerImg = res.data.bannerImg
        this.imgList = res.data.imgList
      } else {
        this.handleGetDetailErr()
      }
    },
    handleGetDetailErr () {
      console.log('error')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
