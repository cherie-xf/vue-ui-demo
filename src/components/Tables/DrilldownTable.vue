<template>
    <figure class="table-container">
    <Tabs value="name1" type="card">
        <TabPane label="table 1" name="name1" class="tab-pane">
            <Table :columns="columns1" :data="data1" :height="tableHeight" size="small"></Table>
        </TabPane>
        <TabPane label="table 2" name="name2">
            <Table :columns="columns1" :data="data2" :height="tableHeight" size="small"></Table>
        </TabPane>
        <TabPane label="table 3" name="name3">
            <Table :columns="columns1" :data="data3" :height="tableHeight" size="small"></Table>
        </TabPane>
    </Tabs>
    </figure>
</template>

<script>

import { source_get } from '@/api/demo'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
export default {
  name: 'DrilldownTable',
  props:['height'],
  data(){
      return {
          columns1: [
            {
                title: 'Source',
                key: 'source',
                render: (h, params) => {
                    return h('span', {attrs:{class: ''}},
                        [
                            h('Avatar', {props:{'src': params.row.avatar}}),
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
      this.fetchData();
  },
  computed:{
     tableHeight: function(){
        console.log('drilldown computed item height', this.height);
        var tabBarHeight = $(this.$el).find('.ivu-tabs-bar').height() || 37 // only available after mounted
        return this.height - tabBarHeight;
     }
  },
  methods:{
      fetchData(){
          source_get().then(
              res=>{
                  var data = res.data.data.rows
                  this.data1 = data.map(function(row){
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
