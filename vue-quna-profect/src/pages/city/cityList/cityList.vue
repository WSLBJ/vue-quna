<template>
  <div ref="wrapper" class="wrapper">
    <div class="list">
      <div class="location-container" ref="current">
        <h6 class="area-title" ref="areaTitle">您的位置</h6>
        <div class="location">
          <div class="location-city citySelect" ref="selectCity">
            {{city}}
          </div>
        </div>
      </div>
      <div class="hotCity-container" ref="hotCity">
        <h6 class="hotCity-title" ref="hotCityTitle">
          热门城市
        </h6>
        <div class="hotCityList">
          <div class="hotCityListItem" :class="{'nowCity': item.name == city}"
               @click="handleHotCityClick" v-for="item of hotCityList" :key="item.id">
            {{item.name}}
          </div>
        </div>
        <div class="cityList">
          <div class="cityListItem" v-for="(item, index) of cityList" :key="item.id" :ref="index">
            <h6 class="city-index city-info">{{index}}</h6>
            <div class="city-info" @click="handleHotCityClick"
                 v-for="(items,index) of item" :key="index">
              {{items.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'city-list',
  props: ['hotCityList', 'cityList'],
  computed: {
    areaPositions () {
      const arr = []
      const { current, hotCity, areaTitle, hotCityTitle } = this.$refs
      arr.push({
        top: current.offsetTop,
        text: areaTitle.innerText
      })
      arr.push({
        top: hotCity.offsetTop,
        text: hotCityTitle.innerText
      })
      for (let i in this.cityList) {
        arr.push({
          top: this.$refs[i][0].offsetTop,
          text: i
        })
      }
      return arr
    },
    ...mapState(['city'])
  },
  methods: {
    ...mapMutations(['changeCity']),
    handleHotCityClick (e) {
      this.changeCity(e.target.innerText)
      this.$nextTick(() => {
        this.$router.push('/')
      })
    },
    scrollToIndex (item) {
      this.scroll.scrollToElement(this.$refs[item][0])
    },
    handleScroll (e) {
      const y = -e.y
      let flag = false
      let letter = ''
      for (let i = 0; i < this.areaPositions.length; i++) {
        let position = this.areaPositions[i]
        if (y > position.top - 30 && y < position.top) {
          const diff = y - position.top + 30
          flag = true
          this.$emit('fixchange', diff)
          break
        }
        if (y >= position.top) {
          letter = position.text
        }
      }
      this.$emit('fixchangeText', letter)
      !flag && this.$emit('fixchange')
      this.$emit('scroll', e)
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3
    })
    this.scroll.on('scroll', this.handleScroll.bind(this))
  },
  activated () {
    this.scroll && this.scroll.refresh()
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variables.styl"
  .wrapper
   height: 20rem
   overflow: hidden
   box-sizing: border-box
   .location-container
      width: 100%
      height: 1.5rem
      display: flex
      flex-direction: column
      justify-content: space-between
      .area-title
        height: .6rem
        line-height: .6rem
        color: #616161
        border-style()/*小标题上下边框*/
        itemTitleBgColor()/*小标题背景*/
        padding-left: .4rem
    .location
        border-radius: .1rem
        border: .03rem solid $selectCity
        text-align: center
        width: 1.8rem
        height: .6rem
        line-height: .6rem
        margin-left: .4rem
        .location-city
         color: $selectCity
    .hotCity-container
      margin-top: .2rem
      .hotCity-title
        width: 100%
        height: .6rem
        line-height: .6rem
        border-style()
        itemTitleBgColor()
        padding-left: .4rem
    .hotCityList
      width: 6.4rem
      padding-top: .1rem
      margin-left: -.22rem
      padding-left: .5rem
      display: flex
      flex-direction: row
      justify-content: space-around
      flex-wrap: wrap
      .hotCityListItem
        width: 30%
        height: .6rem
        line-height: .6rem
        text-align: center
        border-radius: .1rem
        border: .03rem solid #c2c2c2
        margin: .2rem 0
      .nowCity
        border: .03rem solid $selectCity
        color: $selectCity
        text-align: center
    .city-index
      border-style()
      itemTitleBgColor()
    .city-info
      width: 100%
      height: .4rem
      line-height: .4rem
      padding: .1rem 0
      color: #212121
      padding-left: .4rem
      position: relative
      z-index: 100
</style>
