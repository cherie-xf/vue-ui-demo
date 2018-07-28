<template>
<div class="simple-container">
    <v-btn :color="color.level2.name" fab small @click="goBack" class="back-btn">
        <svg-icon :icon-class="`goback1`" :class-name="`goback small`"></svg-icon>
    </v-btn>
    <div class="simple-top">
        <b class="simple-text">
           {{title}} 
        </b>
    </div>
    <div class="simple-content">
        <v-avatar v-if="avatarid" class="simple-avatar" :size="avatarSize">
            <img :src="`static/images/avatar/avatar-${avatarid}.jpg`" alt="avatar">
        </v-avatar>
        <div class="simple-list">
            <div class="simple-row" v-for="(val, key) in listData" :key="key" v-if="getCol(key)">
                <i class="simple-title" v-html="getCol(key).title"></i>
                <div class="simple-text" v-html="val.html || val"></div>
            </div>
        </div>
        <div class="simple-chart">
            <div class="chart-container" v-for="(val, key) in chartData" :key="key" :style="{width: (100/Object.keys(chartData).length) + '%'}">
                <simple-pie :pie-data="getPieData(val, getCol(key).title )"></simple-pie>
            </div>
        </div>

    </div>
</div>
    
</template>
<script>
import SimplePie from '@/components/Charts/SimplePie'
export default {
    name: 'simple',
    components: {SimplePie},
    props:['columns','listData', 'chartData', 'avatarid', 'color', 'action', 'title'],
    mounted(){
    },
    computed:{
       avatarSize(){
           return 96;
       }

    },
    methods:{
      getCol(key){
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
            this.$parent.$emit('goback', { action:'list', });
          }
          if(this.action === 'dd'){
            this.$parent.$emit('goback', { action:'dd', });
          }
      }

    }
}
</script>
<style lang="less" scoped>
    .simple-container{
        height: 100%;
    }
    .simple-top{
        height: 30px; 
        padding-left: 20px;
        padding-top: 5px;
        .simple-text{
            font-size: 1.2em;
            color: rgb(73, 80, 96);
            text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2), 0px -5px 35px rgba(255, 255, 255, 0.3);
        }
    }
    .simple-content{
        height: ~"calc(100% - 30px)";
        display: flex;
        padding: 0 15px;
        align-items: center;
    }
    .simple-list{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        //flex-basis: 40%;
        flex-grow: 1;
    }
    .simple-chart{
        height: 100%;
        flex-basis: 50%;
        flex-shrink: 1;
        display: flex;
        align-items: center;
        .chart-container{
            height: 100%;
        }
    }
    .simple-row{
        display: flex;
        align-items: center;
        .simple-title{
            flex-basis: 40%;
        }
        .simple-text{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .simple-avatar{
        margin-right: 10px;
    }
    .back-btn{
        width: 35px;
        height: 35px;
        position: absolute;
        right: 5px;
    }
    .back-text{
        color: white;
    }
    .goback{
        color: white;
    }

</style>


