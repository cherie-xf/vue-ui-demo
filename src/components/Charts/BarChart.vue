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
// custom theme
import greenTheme from '@/components/Charts/themes/green.json'
import purpleTheme from '@/components/Charts/themes/purple.json'
import amberTheme from '@/components/Charts/themes/amber.json'
import blueTheme from '@/components/Charts/themes/blue.json'

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
          return {

        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration
        }]

        }
    },
    randomize(){
        return [0, 0, 0].map(v => {
            return Math.round(300 + Math.random() * 700) / 10
        })
    }
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
