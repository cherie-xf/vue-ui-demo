<template>
      <figure class="chart-container">
        <chart 
          :options="raddar"
          :init-options="initOptions"
          ref="raddar"
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
import 'echarts/lib/chart/radar'
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

const animationDuration = 3000
export default {
  name: 'RaddarChart',
  data(){
      let options = qs.parse(location.search, { ignoreQueryPrefix: true })
      return {
        options,
        initOptions: {
            renderer: options.renderer || 'canvas'
        },
        raddar: null,
      }
  },
  computed: {
    ...mapGetters([
      'chartTheme'
    ]),
  },
  mounted(){
      this.$nextTick(()=>{
        this.raddar = this.getRaddar();
      });
  },
  methods:{
    getRaddar(){
      return {
        title:{
          text:'Last 3 days Policy Hits',
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
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: 'destop_server1', max: 10000 },
            { name: 'destop_server2', max: 20000 },
            { name: 'destop_server3', max: 20000 },
            { name: 'for-fgt101e1', max: 20000 },
            { name: 'for-fgt102e2', max: 20000 },
            { name: 'for-fgt103e3', max: 20000 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Jul 28', 'Jul 29', 'Jul 30']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: 'Jul 28'
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: 'Jul 29'
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: 'Jul 30'
            }
          ],
          animationDuration: animationDuration
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
