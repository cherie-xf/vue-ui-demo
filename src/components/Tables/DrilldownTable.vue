<template>
    <figure class="table-container">
    <Tabs value="name1" v-if="!isSimple">
        <TabPane label="Source" name="name1" class="tab-pane">
            <spinner :show="showSpinner"></spinner>
            <Table :columns="columns1" :data="data1" :height="tableHeight" 
            no-data-text=""
            @on-row-dblclick="drilldown"
            size="small"></Table>
        </TabPane>
        <TabPane label="Destination" name="name2">
            <Table :columns="columns1" :data="data2" :height="tableHeight" 
            no-data-text=""
            @on-row-dblclick="drilldown"
            size="small"></Table>
        </TabPane>
        <TabPane label="Country" name="name3">
            <Table :columns="columns1" :data="data3" :height="tableHeight" 
            no-data-text=""
            @on-row-dblclick="drilldown"
            size="small"></Table>
        </TabPane>
    </Tabs>
    <simple :columns="columns1" :list-data="listData" :chart-data="chartData" :avatar="avatar" :title="title" v-if="isSimple" :color="barColor" :action="`dd`"></simple>
    </figure>
</template>

<script>

import { source_get } from '@/api/demo'
import Spinner from '@/components/Spinner'
import Simple from './Simple'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
export default {
  name: 'DrilldownTable',
  components:{Spinner, Simple},
  props:['height', 'simple', 'simpleData'],
  data(){
      return {
          showSpinner: true,
          barColor: barColor,
          title:"Top Threat / Top Source",
          columns1: [
            {
                title: 'Source',
                key: 'source',
                render: (h, params) => {
                    return h('span', {attrs:{class: ''}},
                        [
                            h('Avatar', {props:{'src': params.row.avatar}}),
                            //h('Avatar', {props:{'src': `/static/images/avatar/avatar-${params.row.avatarid}.jpg`}}),
                            h('span', {attrs:{class: 'icon-text'}},params.row.source)
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
        data1:[],
        data2:[],
        data3:[],
      }
  },
  mounted(){
      setTimeout(() => {
            this.fetchData().then(
                this.showSpinner = false
            );
        }, 3000);
  },
  computed:{
     tableHeight: function(){
        console.log('drilldown computed item height', this.height);
        var tabBarHeight = $(this.$el).find('.ivu-tabs-bar').height() || 37 // only available after mounted
        return this.height - tabBarHeight;
     },
    avatar(){
        return this.simpleData.avatar;
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
      fetchData(){
         return  source_get().then(
              res=>{
                  var data = res.data.data.rows
                  this.data1 = data.map(function(row){
                      var keys = Object.keys(row);
                      keys.forEach(function(key){
                          if(key === "score" || key === "incidents" || key==="bandwidth"){
                              row[key].total = row[key].in + row[key].out
                          }
                          if(key === "avatarid"){
                              row['avatar'] = `/static/images/avatar/avatar-${row.avatarid}.jpg`
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
                });
          console.log('click drilldown to log',row, index );
      },
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
}
</style>

/*
 * Created Date: Wednesday, June 20th 2018, 5:26:42 pm
 * Author: cheriefu
 * 
 * Copyright (c) 2018 Your Company
 */
