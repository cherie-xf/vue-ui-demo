<template>
      <figure class="chart-container">
        <div class="simple-chart-title">{{pieData.title}}</div>
        <chart 
          :options="pie"
          :init-options="initOptions"
          ref="pie"
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
import 'echarts/lib/chart/pie'
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
  computed: {
    ...mapGetters([
      'chartTheme'
    ]),
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
      console.log('simple pie title', title)
      return {
          title:{
            show:true,
              text: title,
              x: 'center',
              textStyle:{
                  fontWeight: 'lighter',
                  fontStyle:'italic',
                  color: '#333',
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
        //color:['#b2dfdb','#009688' ],
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
    display: flex;
    flex-direction: column;
    align-items: center;
}
.echarts {
  height: 70%;
  width: 100%;
}
.simple-chart-title{
  //font-size: 0.8em;
}
</style>
