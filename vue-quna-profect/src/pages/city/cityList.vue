<template>
  <div ref="wrapper" class="wrapper">
    <div class="list">
      <div class="location-container">
        <h6 class="area-title">您的位置</h6>
        <div class="location">
          <div class="location-city citySelect" ref="selectCity">
            {{city}}
          </div>
        </div>
      </div>
      <div class="hotCity-container">
        <h6 class="hotCity-title">
          热门城市
        </h6>
        <div class="hotCityList">
          <div class="hotCityListItem" :class="{'nowCity': item.name == city}"
               @click="handleHotCityClick" v-for="item of hotCityList" :key="item.id">
            {{item.name}}
          </div>
        </div>
        <div class="cityList">
          <div class="cityListItem" v-for="(item, index) of cityList" :key="item.id">
            <h6 class="city-index city-info">{{index}}</h6>
            <div class="city-info" @click="handleHotCityClick"
                 v-for="(items,index) of item" :key="index">{{items.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'city-list',
  props: ['hotCityList', 'cityList'],
  computed: {
    ...mapState(['city'])
  },
  methods: {
    ...mapMutations(['changeCity']),
    handleHotCityClick (e) {
      this.changeCity(e.target.innerText)
      this.$nextTick(() => {
        this.$router.push('/')
      })
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper)
  },
  activated () {
    this.scroll && this.scroll.refresh()
  }
}
</script>

<style lang="stylus" scoped>
 .wrapper
   height: 10rem
   overflow: hidden
   box-sizing: border-box
   .location-container
      height: 1.3rem
      padding-top: .44rem
      padding-left: .4rem
      display: flex
      flex-direction: column
      justify-content: space-between
      .area-title
        color: #616161
      .location
        border-radius: .1rem
        border: .02rem solid #c2c2c2
        color: #c2c2c2
        text-align: center
        width: 1.8rem
        height: .5rem
        line-height: .5rem
    .hotCity-container
      margin-top: .4rem
      padding-left: .5rem
    .hotCityList
      width: 6.4rem
      padding-top: .1rem
      margin-left: -.22rem
      display: flex
      flex-direction: row
      justify-content: space-around
      flex-wrap: wrap
      .hotCityListItem
        width: 30%
        height: .5rem
        line-height: .5rem
        text-align: center
        margin: .2rem 0
      .nowCity
        border-radius: .1rem
        border: .02rem solid #c2c2c2
        color: #c2c2c2
        text-align: center
    .city-info
      width: 200px
      height: 20px
      padding: 10px 0
      color: #212121
</style>
