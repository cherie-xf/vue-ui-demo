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
//data
import dayData from '@/components/Charts/data/day.json'
import hourData from '@/components/Charts/data/hour.json'
//util
import {customFormat} from '@/utils/date' 

// registering custom theme
ECharts.registerTheme('ovilia-green', greenTheme)
ECharts.registerTheme('purple', purpleTheme)
ECharts.registerTheme('amber', amberTheme)
ECharts.registerTheme('blue', blueTheme)

export default {
  name: 'BarLineChart',
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
        //this.bar = this.getBarLine();
        this.bar = this.getDayData();
      });
  },
  methods:{
    getDayData(){
        var chartData = hourData
        var xAxisData = chartData.time
        var series = []
        var legendData = []
        Object.keys(chartData).forEach( key =>{
            if(key !== 'time'){
                legendData.push(key)
                series.push({
                    name: key,
                    type:'bar',
                    data: chartData[key],
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                })
            }
        })
          return {
            grid:{
                left: '5%',
                right: '5%',
                top: '15%',
                bottom: '18%',
                show: false,
            },
            title: {
                text: ''
            },
            legend: { data: legendData, top: 15 },
            tooltip: {
              trigger: 'axis',
              formatter: function(params){
                var mTime = new Date(Number(params[0].axisValue) * 1000)
                var formatTime = customFormat(mTime, '#MMM# #DD# #hh#:#mm#')
                var html = "<div>"+formatTime+"</div>";
                params.forEach(function(param){
                    var data = param.data;
                    var subHtml = "<div>"+
                        param.marker +
                        param.seriesName +": " + data +
                        "</div>"
                    html +=subHtml;
                });
                return html;
              }
            },
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                },
                axisLabel:{
                    formatter: function(d){
                        /*
                        var mTime = moment(Number(d) * 1000);
                        var formatTime = mTime.format("MMM DD HH:mm");
                        return formatTime;
                        */
                       var mTime = new Date(Number(d) * 1000)
                       return customFormat(mTime, '#MMM# #DD# #hh#:#mm#')
                    }
                }
            },
            yAxis: {
                splitLine:{
                    show: false
                }
            },
            series:series,
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        }

    },
    getBarLine(){
        var xAxisData = [];
        var data1 = [];
        var data2 = [];
        for (var i = 0; i < 100; i++) {
            xAxisData.push('class' + i);
            data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
        }
          return {
            grid:{
                left: '3%',
                right: '3%',
                top: '3%',
                bottom: '3%',
                show: false,
            },
            title: {
                text: ''
            },
            legend: {
                data: ['bar', 'bar2'],
                align: 'left'
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                splitLine:{
                    show: false
                }
            },
            series: [{
                name: 'bar',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }, {
                name: 'bar2',
                type: 'bar',
                data: data2,
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
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
