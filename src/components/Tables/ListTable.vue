<template>
    <figure class="table-container">
       <Table :columns="columns1" 
            :data="data1" 
            :height="tableHeight" 
            size="small" 
            no-data-text=""
            v-if="!isSimple" @on-row-dblclick="drilldown"></Table>
       <simple :columns="columns1" :list-data="listData" :chart-data="chartData" :avatar="avatar" v-if="isSimple"></simple>
       <spinner :show="showSpinner"></spinner>
    </figure>
</template>

<script>

import { threat_get } from '@/api/demo'
import Spinner from '@/components/Spinner'
import Simple from './Simple'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}

export default {
  name: 'ListTable',
  components:{Simple, Spinner},
  props:['height','simple', 'simpleData'],
  data(){
      return {
          showSpinner: true,
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
                                    color: barColor.in, 
                                    "background-color": barColor.out 
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
                                    color: barColor.in, 
                                    "background-color": barColor.out 
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
    if(this.isSimple){
        this.showSpinner = false;
    } else{
        setTimeout(() => {
                this.fetchData().then(
                    this.showSpinner = false
                );
            }, 3000);
    }
  },
  updated(){
  },
  methods:{
      fetchData(){
          return threat_get().then(
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
          this.$emit('drilldown', {
                action:'dd', 
                row: row, 
                index:index, 
                });
          console.log('click drilldown',row, index );
      },
  },
  computed:{
     listData(){
         return this.simpleData.list;
     },
     chartData(){
         return this.simpleData.chart;
     },
     isSimple(){
         return this.simple;
     },
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
    position: relative;
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

