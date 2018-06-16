<template>
      <figure class="chart-container">
        <chart 
          :options="line"
          :init-options="initOptions"
          ref="line"
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
  name: 'LineChart',
  data(){
      let options = qs.parse(location.search, { ignoreQueryPrefix: true })
      return {
        options,
        initOptions: {
            renderer: options.renderer || 'canvas'
        },
        line: null,
      }
  },
  mounted(){
      this.$nextTick(()=>{
        this.line = this.getLine();
      });
  },
  methods:{
    getLine(){
          return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
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
