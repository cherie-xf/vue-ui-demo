<template>
      <figure class="chart-container">
        <chart 
          :options="bar"
          :init-options="initOptions"
          ref="bar"
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
  name: 'BarChart',
  props:['isContainerReady'],
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
  mounted(){
      this.$nextTick(()=>{
        this.bar = this.getBar();
      });
  },
  methods:{
    getBar(){
          return {
            legend: {},
            tooltip: {},
            dataset: {
            // Provide data.
            source: [
                ['Product', '2015', '2016', '2017'],
                ['Matcha Latte', ...this.randomize()],
                ['Milk Tea', ...this.randomize()],
                ['Cheese Cocoa', ...this.randomize()],
                ['Walnut Brownie', ...this.randomize()]
            ]
            },
            // Declare X axis, which is a category axis, mapping
            // to the first column by default.
            xAxis: { type: 'category' },
            // Declare Y axis, which is a value axis.
            yAxis: {},
            // Declare several series, each of them mapped to a
            // column of the dataset by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
