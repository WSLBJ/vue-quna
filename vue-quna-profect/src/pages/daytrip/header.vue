<template>
    <div class="header">
      <div class="back iconfont" @click="handlePrePageClick">&#xe600;</div>
      <div class="search">
                      一日游
      </div>
      <div class="city">
                    北京
      </div>
    </div>
</template>

<script>
export default {
  name: 'daytrip-header',
  methods: {
    handlePrePageClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/variables.styl";
.header
    display: flex
    height: .88rem
    line-height: .88rem
    background: $bgColor
    color: #fff
    .back
      width: .58rem
      line-height: .88rem
      text-align: center
      font-size: .38rem
      font-weight: 900
      padding-left: .1rem
    .search
      flex: 1
      height: .6rem
      line-height: .6rem
      margin: .16rem .1rem
      padding-left: .1rem
      background: #fff
      color: #c2c2c2
      font-size: .26rem
      border-radius: .06rem
    .city
      padding-right: .6rem
      position: relative
      &:after
       position: absolute
       top: .36rem
       right: .2rem
       content: '\0020'
       width: 0
       height: 0
       border-right: .14rem solid transparent
       border-left: .14rem solid transparent
       border-top: .14rem solid #fff
</style>
