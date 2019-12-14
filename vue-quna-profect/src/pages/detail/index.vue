<template>
  <div>
    <banner :bannerImg="bannerImg" :imgList="imgList"></banner>
    <detail-header></detail-header>
    <list :list="ticketList"></list>
    <download v-show="showDownload">download</download>
  </div>
</template>
<script>
import DetailHeader from './header'
import List from './list'
import Banner from './banner'
import Download from 'components/common/download'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  components: {
    Banner,
    Download,
    List,
    DetailHeader
  },
  props: {
    sightId: [Number, String]
  },
  data () {
    return {
      bannerImg: '',
      imgList: [],
      ticketList: []
    }
  },
  computed: {
    ...mapState(['showDownload'])
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
        this.ticketList = res.data.ticketList
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
