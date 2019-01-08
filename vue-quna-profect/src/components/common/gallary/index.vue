<template>
    <div class="gallary">
      <swiper>
        <swiper-slide v-for='(item, index) of imgList' :key='index'>
          <img class='gallary' :src='item' />
        </swiper-slide>
      </swiper>
    </div>
</template>

<script>
export default {
  name: 'gallary',
  props: {
    imgList: Array,
    default: []
  }
}
</script>

<style scoped lang="stylus">
  .gallary
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    /*background: #000*/
</style>
