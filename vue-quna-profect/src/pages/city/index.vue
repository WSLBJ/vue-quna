<template>
  <div>
    <city-header></city-header>
    <city-search :cityList="cityList"></city-search>
    <city-list
             :hotCityList="hotCityList"
             :cityList="cityList"
             ref="cityList"
             ></city-list>
    <city-sidebar :cityList="cityList" @changeLetter="handleChangeLetter"></city-sidebar>
  </div>
</template>

<script>
import CityHeader from './header'
import CitySearch from './search'
import CityList from './cityList'
import CitySidebar from './sidebar'
import axios from 'axios'
export default {
  name: 'city',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CitySidebar
  },
  data () {
    return {
      hotCityList: [],
      cityList: {}
    }
  },
  methods: {
    getIndexData () {
      axios.get('/api/city.json?city=' + this.$store.state.city)
        .then(this.handleGetDataSucc.bind(this))
        .catch(this.handleGetDataErr.bind(this))
    },
    handleGetDataSucc (res) {
      if (res.data.data) {
        const data = res.data.data
        this.hotCityList = data.hotCities
        this.cityList = data.cities
      }
    },
    handleGetDataErr () {
      console.log('error')
    },
    handleChangeLetter (item) {
      this.$refs.cityList.scrollToIndex(item)
    }
  },
  created () {
    this.getIndexData()
  }
}
</script>
