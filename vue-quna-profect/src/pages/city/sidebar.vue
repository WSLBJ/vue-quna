<template>
  <div class="sidebar">
    <div class="side-list" ref="list">
      <div class="side-item"
           v-for="item in alphabet"
           :key="item"
           @touchstart="handleTouchStart(item)"
           @touchmove="handleTouchMove">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city-sidebar',
  props: {
    cityList: Object
  },
  computed: {
    alphabet () {
      const arr = []
      for (let i in this.cityList) {
        arr.push(i)
      }
      return arr
    },
    areaTop () {
      return this.$refs.list.offsetTop - this.$refs.list.offsetHeight / 2 + 81
    }
  },
  methods: {
    handleTouchStart (item) {
      this.$emit('changeLetter', item)
    },
    handleTouchMove (e) {
      let index = (Math.floor((e.touches[0].clientY - this.areaTop) / 18))
      index = index < 0 ? 0 : index
      index = (index >= this.alphabet.length) ? (this.alphabet.length - 1) : index
      this.$emit('changeLetter', this.alphabet[index])
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/variables.styl'
  .sidebar
    position: absolute
    right: 0
    top: 1.62rem
    bottom: 0
    width: .4rem
    .side-list
      height: auto
      width: 100%
      position: absolute
      top: 50%
      transform: translateY(-50%)
     .side-item
       width: 100%
       line-height: .36rem
       text-align: center
       color: #666
</style>
