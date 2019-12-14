<template>
  <div class="search-wrapper">
    <div class="search">
      <input class="search-input" placeholder="输入城市名或拼音" @input="handleInputChange">
    </div>
    <div class="search-list" v-show="showList" ref="list">
      <ul>
        <li class="search-item" v-for="item in filterResult" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'city-search',
  props: {
    cityList: Object
  },
  data () {
    return {
      showList: false,
      filterResult: []
    }
  },
  computed: {
    result () {
      const result = []
      for (let i in this.cityList) {
        this.cityList[i].forEach((item) => {
          result.push({
            name: item.name,
            spell: item.spell
          })
        })
      }
      return result
    }
  },
  watch: {
    filterResult () {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  methods: {
    handleInputChange (e) {
      const value = e.target.value.toLowerCase()
      this.showList = true
      this.filterResult = this.result.filter((item) => {
        if (item.spell.indexOf(value) > -1 || item.name.indexOf(value) > -1) {
          return true
        }
      })
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.list)
  }
}
</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/variables.styl"
  .search-wrapper
    position: relative
    z-index: 1
    .search
      height: .74rem
      background: $bgColor
      padding: 0 .2rem
      .search-input
        width: 100%
        font-size: .24rem
        border-radius: .1rem
        text-align: center
        line-height: .62rem
        padding: 0 .2rem
        box-sizing: border-box
      input::-webkit-input-placeholder  /* WebKit browsers */
        color: #c2c2c2
        font-family: '幼圆'
        font-size: .3rem
      input:-moz-placeholder  /* Mozilla Firefox 4 to 18 */
        color: #c2c2c2
        font-family: '幼圆'
        font-size: .3rem
      input::-moz-placeholder  /* Mozilla Firefox 19+ */
        color: #c2c2c2
        font-family: '幼圆'
        font-size: .3rem
      input:-ms-input-placeholder  /* Internet Explorer 10+ */
        color: #c2c2c2
        font-family: '幼圆'
        font-size: .3rem
    .search-list
      background-color: #f5f5f5
      position absolute
      top: 1.62rem
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
      z-index: 1
      .search-item
        padding-left: .2rem
        line-height: .8rem
        background-color: #fff
        color: #333
</style>
