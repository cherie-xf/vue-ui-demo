<template>
      <figure class="chart-container">
        <chart 
          :options="bar"
          :init-options="initOptions"
          ref="bar"
          :theme="chartTheme"
          auto-resize
          class="mychart"
        />
      </figure>
</template>

<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts.vue'
// built-in theme (must import once for the style not include in custom theme)
import 'echarts/theme/dark' 
// custom theme
import greenTheme from '@/components/Charts/themes/green.json'
import purpleTheme from '@/components/Charts/themes/purple.json'
import amberTheme from '@/components/Charts/themes/amber.json'
import blueTheme from '@/components/Charts/themes/blue.json'
//data
import barData from '@/components/Charts/data/bar.json'

// registering custom theme
ECharts.registerTheme('ovilia-green', greenTheme)
ECharts.registerTheme('purple', purpleTheme)
ECharts.registerTheme('amber', amberTheme)
ECharts.registerTheme('blue', blueTheme)

const animationDuration = 6000
export default {
  name: 'BarChart',
  data(){
      let options = qs.parse(location.search, { ignoreQueryPrefix: true })
      return {
        options,
        initOptions: {
            renderer: options.renderer || 'canvas'
        },
        bar: null,
      }
  },
  computed: {
    ...mapGetters([
      'chartTheme'
    ]),
  },
  mounted(){
      this.$nextTick(()=>{
        this.bar = this.getBar();
      });
  },
  methods:{
    getBar(){
        var chartData = barData
        var xData = chartData.map(o =>{return o.srcip})
        var legendData = xData
      return {
        title:{
          text:'Top 10 Source',
          textStyle:{
            fontSize: 12
          },
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 50,
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'Sent',
          type: 'bar',
          stack: 'vistors',
          barWidth: '50%',
          data: chartData.map(o=>{return o.traffic_out}),
          animationDuration
        }, {
          name: 'Recived',
          type: 'bar',
          stack: 'vistors',
          barWidth: '50%',
          data: chartData.map(o=>{return o.traffic_in}),
          animationDuration
        }]

        }
    },
  }
}
</script>

<style lang="less" scoped>
.chart-container{
    height: 100%;
}
.echarts {
  height: 100%;
  width: auto;
}
</style>
