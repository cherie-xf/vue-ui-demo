<template>
    <figure class="table-container">
    <Tabs :value="currentName" v-if="!isSimple" @on-click="tabChange">
        <TabPane label="Source" name="source" class="tab-pane" >
            <spinner :show="showSpinner"></spinner>
            <Table :columns="cols.source" :data="tableData.source" :height="tableHeight" 
            no-data-text=""
            @on-row-dblclick="drilldown"
            size="small"></Table>
        </TabPane>
        <TabPane label="Destination" name="destination" >
            <Table :columns="cols.destination" :data="tableData.destination" :height="tableHeight" 
            no-data-text=""
            @on-row-dblclick="drilldown"
            size="small"></Table>
        </TabPane>
        <TabPane label="Country" name="country" >
            <Table :columns="cols.country" :data="tableData.country" :height="tableHeight" 
            no-data-text=""
            @on-row-dblclick="drilldown"
            size="small"></Table>
        </TabPane>
    </Tabs>
    <simple :columns="currentCols" :list-data="listData" :chart-data="chartData" :avatarid="avatarid" :title="title" v-if="isSimple" :color="barColor" :action="`dd`"></simple>
    <table-search v-if="!isSimple" class="table-search" :color="barColor" @searchsubmit="reFetchData"></table-search>
    </figure>
</template>

<script>

import { source_get, destination_get } from '@/api/demo'
import Spinner from '@/components/Spinner'
import Simple from './Simple'
import TableSearch from '@/components/TableSearch'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
export default {
  name: 'DrilldownTable',
  components:{Spinner, Simple, TableSearch},
  props:['height', 'simple', 'simpleData','cacheData', 'tabName'],
  data(){
      return {
          showSpinner: true,
          barColor: barColor,
          title:"Top Threat / Top Source",
          cols:{
              source: [
                {
                    title: 'Source',
                    key: 'source',
                    render: (h, params) => {
                        return h('span', {attrs:{class: ''}},
                            [
                                h('Avatar', {props:{'src': params.row.avatar}}),
                                //h('Avatar', {props:{'src': `/static/images/avatar/avatar-${params.row.avatarid}.jpg`}}),
                                h('span', {attrs:{class: 'icon-text'}},`${params.row.user} (${params.row.source})`)
                            ],
                        )
                    }
                },
                {
                    title: 'Device',
                    key: 'device'
                },
                {
                    title: 'Interface',
                    key: 'interface'
                },
                {
                    title: 'Session',
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
                    title: 'Events',
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
                },
                {
                    title: 'Byte',
                    key: 'bandwidth',
                    render: (h, params) =>{
                        return h('div', {attrs:{class: 'flex'}},
                            [
                                h('div',{attrs:{class: 'grow'}},params.row.bandwidth.total),
                                h('v-progress-linear', {
                                    props:{
                                        value: (params.row.bandwidth.in/params.row.bandwidth.total) * 100,
                                        color: barColor.in, 
                                        "background-color": barColor.out 
                                    }
                                })
                            ],
                        )
                    }
                },
            ],
            destination: [
                {
                    title: 'Destination',
                    key: 'dest',
                    render: (h, params) => {
                        return h('div', {attrs:{class: 'dest'}},
                            [
                                h('svg-icon', {props:{'icon-class': params.row.country}}),
                                h('span', {attrs:{class: 'icon-text'}},`${params.row.dest}`)
                            ],
                        )
                    }

                },
                {
                    title: 'Session',
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
                    title: 'Events',
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
                },
                {
                    title: 'Byte',
                    key: 'bandwidth',
                    render: (h, params) =>{
                        return h('div', {attrs:{class: 'flex'}},
                            [
                                h('div',{attrs:{class: 'grow'}},params.row.bandwidth.total),
                                h('v-progress-linear', {
                                    props:{
                                        value: (params.row.bandwidth.in/params.row.bandwidth.total) * 100,
                                        color: barColor.in, 
                                        "background-color": barColor.out 
                                    }
                                })
                            ],
                        )
                    }
                },
            ],

          },
          tableData:{
              source: [],
              destination: [],
              country: [],
          },
      }
  },
  mounted(){
    this.currentName = this.tabName ? this.tabName : this.currentName
    this.title = 'Top Threat / Top ' + this.currentName
    if(this.isSimple || (this.cacheData[this.currentName] && this.cacheData[this.currentName].length)){
        this.showSpinner = false;
        if(!this.isSimple && this.cacheData[this.currentName]){
            this.tableData = this.cacheData;
        }
    } else{
        this.fetchData();
    }
  },
  updated(){
      console.log('drilldown table updated')
  },
  computed:{
    tableHeight(){
       var tabBarHeight = $(this.$el).find('.ivu-tabs-bar').height() || 37 // only available after mounted
       return this.height - tabBarHeight;
    },
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
  },
  methods:{
      hideSpinner(){
        setTimeout(() => {
            this.showSpinner = false
        }, 1000);
      },
      fetchData(){
         source_get().then(
              res=>{
                  var data = res.data.data.rows
                  this.tableData.source = data.map(function(row){
                      var keys = Object.keys(row);
                      keys.forEach(function(key){
                          if(key === "score" || key === "incidents" || key==="bandwidth"){
                              row[key].total = row[key].in + row[key].out
                          }
                          if(key === "avatarid"){
                              row['avatar'] = `static/images/avatar/avatar-${row.avatarid}.jpg`
                          }
                      });
                      return row;
                  })
                  this.hideSpinner();
              }
        )
        destination_get().then(
              res=>{
                  var data = res.data.data.rows
                  this.tableData.destination = data.map(function(row){
                      var keys = Object.keys(row);
                      keys.forEach(function(key){
                          if(key === "score" || key === "incidents" || key==="bandwidth"){
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
                action:'log', 
                row: row, 
                index:index, 
                cacheData: this.tableData,
                tabName: this.currentName,
          });
      },
      reFetchData(){
          this.showSpinner = true;
          this.tableData.source = [];
          this.fetchData();
      },
      tabChange(name){
          this.currentCols = this.cols[name]
          this.currentName = name
          console.log('tab change', name, this.currentCols, this.cols)
      }
  },
  created(){
      this.currentName = this.tabName || 'source'
      this.title = 'Top Threat / Top ' + this.currentName
      this.currentCols = this.cols[this.currentName] //set default cols
  }
}
</script>


<style lang="less">
/* should not be scoped for overwrite ive style*/
.icon-text{
    margin-left: 10px;
}
.flex{
    display: flex;
    align-items: center;
    .grow{
        flex-grow: 1;
        margin-right: 10px;
    }
}
.table-container{
    position: relative;
    height: 100%;
    .ivu-tabs {
        height: 100%;
        .ivu-tabs-bar{
            margin-bottom: 0;
        }
    }
    .ivu-table-cell{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.dest{
    display: flex;
    align-items: center;
}
</style>

/*
 * Created Date: Wednesday, June 20th 2018, 5:26:42 pm
 * Author: cheriefu
 * 
 * Copyright (c) 2018 Your Company
 */
