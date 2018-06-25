<template>
    <figure class="table-container">
       <Table :columns="columns1" :data="data1" :height="tableHeight" size="small" v-if="!isSimple" @on-row-dblclick="drilldown"></Table>
       <simple :columns="columns1" :list-data="listData" :chart-data="chartData" :avatar="avatar" v-if="isSimple"></simple>
    </figure>
</template>

<script>

import { threat_get } from '@/api/demo'
import Simple from './Simple'
const chartSet = new Set(['score', 'incidents', 'bandwidth'])

export default {
  name: 'ListTable',
  components:{Simple},
  props:['height'],
  data(){
      return {
          isSimple: false,
          listData: {},
          chartData:{},
          avatar: null,
          columns1: [
                    {
                        title: 'Threat',
                        key: 'threat'
                    },
                    {
                        title: 'Category',
                        key: 'category',
                    },
                    {
                        title: 'Threat Level',
                        key: 'level',
                        sortable: true,
                        sortType: 'desc',
                        render: (h, params) => {
                            return h('Badge',{
                                props:{count: params.row.level, "class-name": params.row.level}
                            })

                        }
                    },
                    {
                        title: 'Threat Score',
                        key: 'score',
                        render: (h, params) =>{
                            return h('div', {attrs:{class: 'flex'}},
                                [
                                    h('div',{attrs:{class: 'grow'}},params.row.score.total),
                                    h('v-progress-linear', {
                                        props:{
                                            value: (params.row.score.in/params.row.score.total) * 100,
                                            color: "yellow", 
                                            "background-color": "blue"
                                        }
                                    })
                                ],

                            )

                        }
                    },
                    {
                        title: 'Incidents',
                        key: 'incidents',
                        render: (h, params) =>{
                            return h('div', {attrs:{class: 'flex'}},
                                [
                                    h('div',{attrs:{class: 'grow'}},params.row.incidents.total),
                                    h('v-progress-linear', {
                                        props:{
                                            value: (params.row.incidents.in/params.row.incidents.total) * 100,
                                            color: "yellow", 
                                            "background-color": "blue"
                                        }
                                    })
                                ],

                            )

                        }
                    }
                ],
                data1: [],
      }
  },
  mounted(){
      this.fetchData();
  },
  updated(){
  },
  methods:{
      fetchData(){
          threat_get().then(
              res=>{
                  var data = res.data.data.rows
                  this.data1 = data.map(function(row){
                      var keys = Object.keys(row);
                      keys.forEach(function(key){
                          if(key === "score" || key === "incidents"){
                              row[key].total = row[key].in + row[key].out
                          }
                      });
                      return row;
                  })
              }
          )
      },
      drilldown(row, index){
          this.isSimple = true;
          var keys = Object.keys(row);
          keys.forEach((key)=>{
              if(chartSet.has(key)){
                  this.chartData[key]= row[key];
              } else{
                  this.listData[key] = row[key];
              }
          });
          console.log(row, index);

      }
  },
  computed:{
     tableHeight: function(){
          console.log('list table computed item height', this.height);
         return this.height;
     }
  },
  watch:{
  }
}
</script>

<style lang="less">
.flex{
    display: flex;
    align-items: center;
    .grow{
        flex-grow: 1;
        margin-right: 10px;
    }
}
.table-container{
    height: 100%;
}
.ivu-badge-count{
    &.low{
        background: #5cb85c;
    }
    &.high{
        background: orange;
    }
    &.medium{
        background: yellow;
        color: #333;
    }

}
</style>
/*
 * Created Date: Thursday, June 21st 2018, 4:46:20 pm
 * Author: cheriefu
 * 
 * Copyright (c) 2018 Your Company
 */

