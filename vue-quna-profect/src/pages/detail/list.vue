<template>
  <div>
    <div v-for="(area, index) in ticketList" :key="index">
      <h3 class="title border-bottom">{{area.title}}</h3>
      <ul>
        <li class="list-item" v-for="(ticket, tIndex) in area.list" :key="tIndex" v-show="ticket.show">
          {{ticket.title}} {{ticket.desc}} {{ticket.price}}
          <div>
            <div v-for="(supplier, sIndex) in ticket.suppliers" v-show="supplier.show" :key="sIndex">
              {{supplier.name}}
            </div>
            <div v-if="ticket.hasMore" @click="handleSupplierClick(index, tIndex, $event)">更多供应商</div>
          </div>
        </li>
      </ul>
      <div class="more" v-if="area.hasMore" @click="handleClick(index, $event)">点击查看更多</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-list',
  props: {
    list: Array
  },
  data () {
    return {
      ticketList: this.list
    }
  },
  watch: {
    list () {
      this.ticketList = JSON.parse(JSON.stringify(this.list))
    }
  },
  methods: {
    handleClick (index, e) {
      e.target.style.display = 'none'
      this.ticketList[index].list = this.ticketList[index].list.map((value, index) => {
        value.show = true
        return value
      })
    },
    handleSupplierClick (index, childIndex, e) {
      e.target.style.display = 'none'
      let suppliers = this.ticketList[index].list[childIndex].suppliers
      suppliers = suppliers.map((value) => {
        value.show = true
        return value
      })
      return suppliers
    }
  }
}
</script>

<style scoped lang="stylus">
  .title
    line-height: .7rem
    padding: 0 .4rem
  .list-item
    line-height: .6rem
    padding: 0 .4rem
  .more
    line-height: .6rem
    text-align: center
</style>
