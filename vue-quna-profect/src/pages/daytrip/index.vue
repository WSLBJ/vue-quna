<template>
 <div>
     <daytrip-header></daytrip-header>
     <div v-for="(item, index) of list" :key="index">
       {{item}}
     </div>
 </div>
</template>

<script>
import DaytripHeader from './header'
import axios from 'axios'
export default {
  name: 'index',
  components: {
    DaytripHeader
  },
  props: ['id'],
  data () {
    return {
      list: []
    }
  },
  methods: {
    getDaytTripInfo () {
      axios.get('/api/daytrip.json?id=' + this.id)
        .then(this.handleGetDataSucc.bind(this))
        .catch(this.handleGetDataErr.bind(this))
    },
    handleGetDataSucc (res) {
      this.list.push(res.data.data)
    },
    handleGetDataErr () {
      console.log('error')
    }
  },
  mounted () {
    this.getDaytTripInfo()
  },
  watch: {
    id () {
      this.getDaytTripInfo()
    }
  }
}
</script>

<style></style>
