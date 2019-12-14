<template>
  <div class="download" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'download',
  methods: {
    ...mapMutations(['changeDownload']),
    handleClick () {
      this.changeDownload(false)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../../assets/stylus/variables.styl"
  .download
    position: fixed
    top: 0
    left: 0
    right: 0
    line-height: 1rem
    color: #fff
    background: #000
    z-index: 2
</style>
