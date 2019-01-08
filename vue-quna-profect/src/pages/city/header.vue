<template>
   <header class="header">
     <div class="back iconfont" @click="handleBackClick">&#xe600;</div>
     <div class="header-title">
       <div class="areaSwitch inland select">国内</div>
       <div class="areaSwitch foreign">国外</div>
     </div>
   </header>
</template>

<script>
export default {
  name: 'city-header',
  methods: {
    handleBackClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/variables.styl"
  .header
    background: $bgColor
    height: .88rem
    line-height: .88rem
    display: flex
    justify-content: center
    position: relative
    color: #fff
    text-align: center
    .back
      width: .58rem
      line-height: .88rem
      font-size: .38rem
      font-weight: 900
      padding-left: .1rem
      position: absolute
      left: 0
    .header-title
      width: 3rem
      height: .5rem
      font-size: .26rem
      line-height: .5rem
      margin: .15rem .1rem
      display: flex
      .areaSwitch
        border: .02rem solid #fff
      .inland
        width: 50%
        color: #c2c2c2
        border-radius: .1rem 0 0 .1rem
        border-right: 0
        background: #fff
      .foreign
        width: 50%
        border-radius: 0 .1rem .1rem 0
        color: #fff
</style>
