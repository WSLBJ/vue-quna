<template>
 <div class="main">
     <index-header></index-header>
     <index-swiper :list="swiperInfo"></index-swiper>
     <index-icons :list="iconsInfo"></index-icons>
     <index-sights class="sights" :list="sightsInfo"></index-sights>
 </div>
</template>

<script>
import IndexHeader from './header'
import IndexSwiper from './swiper'
import IndexIcons from './icons'
import IndexSights from './sights'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  name: 'index',
  components: {
    IndexHeader,
    IndexSwiper,
    IndexIcons,
    IndexSights
  },
  data () {
    return {
      swiperInfo: [],
      iconsInfo: [],
      sightsInfo: []
    }
  },
  computed: {
    ...mapState({
      city: 'city'
    })
  },
  methods: {
    ...mapActions({
      delayCity: 'changeCityDelayFiveSeconds'
    }),
    getIndexData () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.handleGetDataSucc.bind(this))
        .catch(this.handleGetDataErr.bind(this))
    },
    handleGetDataSucc (res) {
      const data = res.data.data
      this.swiperInfo = data.swiperList
      this.iconsInfo = data.iconList
      this.sightsInfo = data.sightsList
      if (!this.city) {
        this.delayCity(data.city)
      }
    },
    handleGetDataErr () {
      console.log('error')
    }
  },
  created () {
    this.getIndexData()
  },
  mounted () {
    this.scroll = new BScroll('.main')
  },
  watch: {
    city () {
      this.getIndexData()
    }
  }
}
</script>

<style scoped lang="stylus">
  .main
    display: flex
    flex-direction: column
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    .sights
      flex: 1
      overflow: hidden
</style>
