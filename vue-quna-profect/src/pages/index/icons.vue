<template>
  <div class='icons'>
    <swiper :options='swiperOption'>
      <swiper-slide v-for="(page, index) of pageList" :key="index">
          <div class="area-con">
             <div class="area-item" v-for="item of page" :key="item.id">
                 <img class="area-img" :src="item.imgUrl" alt="" />
                 <p class="area-desc">{{item.title}}</p>
             </div>
          </div>
      </swiper-slide>
      <div class='swiper-pagination'  slot='pagination'></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'index-icons',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination'
      }
    }
  },
  computed: {
    pageList () {
      const pages = []
      this.list.forEach((value, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(value)
      })
      return pages
    }
  },
  mounted () {
    setTimeout(() => {
    }, 3000)
  }
}
</script>

<style lang="stylus" scoped>
  .icons
    overflow: hidden
    height: 0
    width: 100%
    padding-bottom: 3.9rem
    .area-con
      display: flex
      flex-wrap: wrap
      .area-item
        width: 25%
        height: 1.6rem
      .area-img
        display: block
        margin: .3rem auto .1rem auto
        width: 1.1rem
        height: 1.1rem
      .area-desc
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        line-height: .4rem
        text-align: center
    .swiper-pagination
      position: absolute
      bottom: 0
    .swiper-pagination >>> .swiper-pagination-bullet
       width: .12rem
       height: .12rem
    .swiper-pagination >>> .swiper-pagination-bullet-active
       background: rgba(0,175,190,.8)
    .swiper-container
     height: 3.8rem
</style>
