<template>
    <figure class="table-container">
       <Table :columns="columns1" 
            :data="data1" 
            :height="tableHeight" 
            size="small" 
            no-data-text=""
            v-if="!isSimple" @on-row-dblclick="drilldown"></Table>
       <simple :columns="columns1" :list-data="listData" :chart-data="chartData" :avatarid="avatarid" :title="title" v-if="isSimple" :color="colors" :action="`list`"></simple>
       <spinner :show="showSpinner"></spinner>
       <table-search v-if="!isSimple" class="table-search" :color="colors" @searchsubmit="reFetchData"></table-search>
    </figure>
</template>

<script>

import { threat_get } from '@/api/demo'
import { mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'
import TableSearch from '@/components/TableSearch'
import Simple from './Simple'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}

export default {
  name: 'ListTable',
  components:{Simple, Spinner, TableSearch},
  props:['height','simple', 'simpleData','cacheData'],
  data(){
      return {
          showSpinner: true,
          showSearch:false,
          title:'Top Threat',
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
                title: 'CVE-ID',
                key: 'cveid',
            },
            {
                title: 'Threat Level',
                key: 'level',
                sortable: true,
                sortType: 'desc',
                sortMethod: (a, b, type)=>{ return b.value - a.value},
                render: (h, params) => {
                    return h('Badge',{
                        props:{count: params.row.level.text, "class-name": params.row.level.text}
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
                                    color: this.colors.level2.name, 
                                    "background-color":this.colors.level4.name 
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
                                    color: this.colors.level2.name, 
                                    "background-color":this.colors.level4.name 
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
    if(this.isSimple || this.cacheData.length){
        this.showSpinner = false;
        if(!this.isSimple && this.cacheData.length){
            this.data1 = this.cacheData;
        }
    } else{
        this.fetchData().then(
            //this.hideSpinner()
        );
    }
  },
  updated(){
      console.log('list table updated')
  },
  methods:{
      hideSpinner(){
        setTimeout(() => {
            this.showSpinner = false
        }, 1000);
      },
      fetchData(){
          return threat_get().then(
              res=>{
                  var data = res.data.data.rows
                  var theatName = []
                  this.data1 = data.filter((elem, pos, arr) => {
                      if(theatName.indexOf(elem.threat) <0 ){
                        theatName.push(elem.threat)
                        return true
                      } else{
                        return false
                      }
                  })
                  .sort((row1, row2) => {
                      return row1.level.value - row2.level.value
                  })
                  .map(row => {
                      var keys = Object.keys(row);
                      keys.forEach(function(key){
                          if(key === "score" || key === "incidents"){
                              row[key].total = row[key].in + row[key].out
                          }
                          if(key === "level"){
                              row[key].html = `<span class="ivu-badge"> <sup class="ivu-badge-count ${row[key].text} ivu-badge-count-alone">${row[key].text}</sup></span>`
                          }
                      });
                      return row;
                  })
                  this.hideSpinner()
              }
          )
      },
      drilldown(row, index){
          this.$emit('drilldown', {
                action:'dd', 
                row: row, 
                index:index, 
                cacheData: this.data1,
                });
      },
      reFetchData(){
          console.log('re fetch data')
          this.showSpinner = true;
          this.data1 = [];
          this.fetchData();
      }
  },
  computed:{
    ...mapGetters([
      'colors'
    ]),
    avatarid(){
        return this.simpleData.avatarid;
    },
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

