<template>
    <h6 class="fixed-title" v-show="show" ref="title">{{letter}}</h6>
</template>

<script>
export default {
  name: 'fixedTitle',
  data () {
    return {
      show: false,
      letter: '您的位置'
    }
  },
  methods: {
    setShow (flag) {
      this.show = flag
    },
    setMove (num) {
      this.$refs.title.style.top = (81 - num) + 'px'
    },
    setText (text) {
      this.letter = text
    }
  }
}
</script>

<style scoped lang="stylus">
  .fixed-title
    position: fixed
    top: 1.62rem
    left: 0
    right: 0
    height: .6rem
    line-height: .6rem
    color: #212121
    border-top: .01rem solid #c2c2c2
    border-bottom: .01rem solid #c2c2c2
    background-color: #eaeaea
    padding-left: .4rem
</style>
