<template>
  <div class="sights">
    <div class="content">
      <transition name="fade">
        <div v-show="isLoading" class="loading">正在加载...</div>
      </transition>
     <router-link class="item" v-for="item of sights" :to="'/detail/' + item.id"
                  :key="item.id"
                  tag="div">
       <img class="item-img" v-lazy="item.imgUrl" alt="" />
       <div class="item-right">
         <p class="item-title">{{item.title}}</p>
         <p class="item-comment">
           <i class="starlevel-comment iconfont">&#xe645;&#xe645;&#xe645;&#xe645;&#xe645;</i>
           {{item.comment}}
         </p>
         <p class="item-price">
           <span class="price-tag">&yen;</span>
           {{item.price}}
           <span class="price-start">起</span>
         </p>
         <p class="item-desc">{{item.desc}}</p>
       </div>
     </router-link>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'index-sights',
  props: {
    list: Array
  },
  data () {
    return {
      moreSights: [],
      isLoading: false,
      isFetching: false,
      pageNum: 1
    }
  },
  watch: {
    sights () {
      this.$nextTick(() => {
        this.scroller.refresh()
      })
    }
  },
  computed: {
    sights () {
      return this.list.concat(this.moreSights)
    },
    ...mapState(['city'])
  },
  methods: {
    createScroller () {
      this.scroller = new BScroll('.sights', {
        probeType: 3
      })
    },
    bindevents () {
      this.scroller.on('scroll', this.handleScroll.bind(this))
      this.scroller.on('scrollEnd', this.handleScrollEnd.bind(this))
    },
    handleScroll (e) {
      if (e.y > 60 && !this.isLoading) {
        this.getListInfo()
        this.isLoading = true
      }
    },
    handleScrollEnd () {
      this.isLoading = false
    },
    getListInfo () {
      if (!this.isFetching) {
        this.isFetching = true
        axios.get('/api/sightsList.json?city=' + this.city + '&page=' + this.pageNum)
          .then(this.handleGetListSucc.bind(this))
          .catch(this.handleGetListErr.bind(this))
      }
    },
    handleGetListSucc (res) {
      res && (res = res.data)
      if (res.data) {
        if (res.data.sightsList) {
          this.moreSights = this.moreSights.concat(res.data.sightsList)
          this.pageNum += 1
        }
        this.isFetching = false
      } else {
        this.handleGetListErr()
      }
    },
    handleGetListErr () {
      this.isFetching = false
      console.log('获取景点失败')
    }
  },
  mounted () {
    this.createScroller()
    this.bindevents()
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../assets/stylus/variables.styl"
 .loading
   line-height: .8rem
   text-align: center
   color: $lightFontColor
 .fade-enter-active, .fade-leave-active
   transition: opacity .5s
 .fade-enter, .fade-leave-to
   opacity: 0
 .item
   width: 7.26rem
   height: 2.7rem
   border-bottom: 1px solid #e0e0e0
   display: flex
   padding: .24rem
   .item-img
     width: 2rem
     height: 2rem
     margin-right: .2rem
   .item-right
     flex: 1
     .item-title
       height: .44rem
       color: $fontColor
       font-size: .32rem
       line-height: .44rem
   .item-comment
     padding: .2rem .3rem .3rem 0
    .item-comment >>> .starlevel-comment
       color: #ffb436
       overflow: hidden
       height: .28rem
       font-size: .28rem
       letter-spacing: .02rem
       margin-right: .3rem
   .item-price
     margin-top: .22rem
     font-size: .4rem
     color: $priceColor
     .price-tag
       font-size: .3rem
       line-height: .4rem
     .price-start
       color: #616161
       font-size: .3rem
   .item-desc
     display: inline-block
     margin-top: .48rem
     margin-right: .24rem
     background: #fff9f9
     padding: .04rem .1rem
     color: #f55
     font-size: .24rem
     line-height: .34rem
</style>
