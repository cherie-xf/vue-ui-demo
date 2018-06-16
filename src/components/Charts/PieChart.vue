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
        title: {
            text: 'pie chart',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['a', 'b', 'c', 'd', 'e']
        },
        series: [
            {
            name: 'name',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: 'a'},
                {value: 310, name: 'b'},
                {value: 234, name: 'c'},
                {value: 135, name: 'd'},
                {value: 1548, name: 'e'}
            ],
            itemStyle: {
                emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
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
