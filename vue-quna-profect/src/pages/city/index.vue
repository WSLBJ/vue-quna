<template>
  <div>
    <city-header></city-header>
    <city-search :cityList="cityList"></city-search>
    <city-list
             :hotCityList="hotCityList"
             :cityList="cityList"
             ref="cityList"
             @scroll="handleCityListScroll"
             @fixchange="handleFixChange"
             @fixchangeText="handleFixChangeText"></city-list>
    <city-sidebar :cityList="cityList" @changeLetter="handleChangeLetter"></city-sidebar>
    <fixed-title ref="fixedTitle"></fixed-title>
  </div>
</template>

<script>
import CityHeader from './header'
import CitySearch from './search'
import CityList from './cityList/cityList'
import CitySidebar from './sidebar'
import FixedTitle from './cityList/fixedTitle'
import axios from 'axios'
export default {
  name: 'city',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CitySidebar,
    FixedTitle
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
      this.$refs.fixedTitle.setText(item)
      this.$refs.cityList.scrollToIndex(item)
    },
    handleCityListScroll (e) {
      this.$refs.fixedTitle.setShow(!(e.y > 0))
    },
    handleFixChange (num) {
      this.$refs.fixedTitle.setMove(num || 0)
    },
    handleFixChangeText (text) {
      this.$refs.fixedTitle.setText(text)
    }
  },
  created () {
    this.getIndexData()
  }
}
</script>
