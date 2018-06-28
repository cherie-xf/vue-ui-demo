<template>
<div class="simple-container">

    <div v-if="avatar" class="avatar"></div>
    <div class="simple-list">
        <div class="simple-row" v-for="(val, key) in listData" :key="key">
            <i class="simple-title" v-html="getCol(key).title"></i>
            <div class="simple-text" v-html="val"></div>
        </div>
    </div>
    <div class="simple-chart">
        <div class="chart-container" v-for="(val, key) in chartData" :key="key" :style="{width: (100/Object.keys(chartData).length) + '%'}">
            <simple-pie :pie-data="getPieData(val, key)"></simple-pie>
        </div>
    </div>
    <v-btn :color="color.in" fab small @click="goBack">
        <b class="back-text">x</b>
    </v-btn>
</div>
    
</template>
<script>
import SimplePie from '@/components/Charts/SimplePie'
export default {
    name: 'simple',
    components: {SimplePie},
    props:['columns','listData', 'chartData', 'avatar', 'color', 'action'],
    mounted(){
        console.log('list Data', this.listData, this.chartData, this.columns, this.color);
    },
    computed:{

    },
    methods:{
      getCol(key){
          console.log('col get',key,this.columns.find(col=>col.key === key))
          return this.columns.find(col=>col.key === key)
      },
      getPieData(data, title){
          var res = {};
          res.title = title;
          res.seriesData = [];
          var keys = Object.keys(data).filter((key)=>{ return key !== 'total'});
          keys.forEach((key)=>{
              res.seriesData.push({name: key, value: data[key]});
          },this);
          return res;
      },
      goBack(){
          if(this.action === 'list'){
            this.$parent.$emit('goback', {
                    action:'list', 
                    });
            console.log('goback');
          }
      }

    }
}
</script>
<style lang="less" scoped>
    .simple-container{
        height: 100%;
        display: flex;
        padding-left: 20px;
    }
    .simple-list{
        padding: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        flex-basis: 40%;
    }
    .simple-chart{
        flex-basis: 50%;
        display: flex;
        align-items: center;
        .chart-container{
            height: 100%;
            padding: 10px;
        }
    }
    .simple-row{
        display: flex;
        align-items: center;
        .simple-title{
            flex-basis: 40%;

        }
    }
    .back-text{
        font-size: 1.1em;
        color: white;
    }

</style>


