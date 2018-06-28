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
// custom theme
import theme from '@/components/Charts/themes/green.json'
import ECharts from 'vue-echarts/components/ECharts.vue'

// registering custom theme
ECharts.registerTheme('ovilia-green', theme)

export default {
  name: 'SimplePie',
  props:['pieData'],
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
      var legendData = this.pieData.legendData;
      var seriesData = this.pieData.seriesData;
      var title  = this.pieData.title;
      return {
          title:{
              text: title,
              x: 'center',
              textStyle:{
                  fontWeight: 'lighter',
                  fontStyle:'italic'
              }
          }, 
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            show: false,
          /*
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
          */
        },
        color:['#b2dfdb','#009688' ],
        calculable: true,
        series: [
          {
            name: title,
            type: 'pie',
            //roseType: 'radius',
            radius: ['60%', '70%'],
            label:{
                normal:{
                    show: false,
                }
            },
            hoverOffset: 2,
            //radius: [15, 95],
            center: ['50%', '55%'],
            /*
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            */
            data:seriesData,
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
