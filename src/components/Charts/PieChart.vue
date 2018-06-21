<template>
      <figure class="chart-container">
        <chart 
          :options="pie"
          :init-options="initOptions"
          ref="pie"
          theme="ovilia-green"
          auto-resize
          class="mychart"
        />
      </figure>
</template>

<script>
import qs from 'qs'
import 'echarts/theme/dark'
// custom theme
import theme from '@/components/Charts/themes/green.json'
import ECharts from 'vue-echarts/components/ECharts.vue'
// Map of China
import chinaMap from '@/components/Charts/maps/china.json'

// registering custom theme
ECharts.registerTheme('ovilia-green', theme)
// registering map data
ECharts.registerMap('china', chinaMap)

export default {
  name: 'PieChart',
  data(){
      let options = qs.parse(location.search, { ignoreQueryPrefix: true })
      return {
        options,
        initOptions: {
            renderer: options.renderer || 'canvas'
        },
        pie: null,
      }
  },
  mounted(){
      this.$nextTick(()=>{
        this.pie = this.getPie();
      });
  },
  methods:{
    getPie(){
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
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
