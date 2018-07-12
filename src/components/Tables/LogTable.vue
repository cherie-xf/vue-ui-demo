<template>
    <figure class="table-container">
       <Table :columns="columns" 
            :data="data1" 
            :height="tableHeight" 
            size="small" 
            no-data-text="" 
            @on-row-click="changeRow"
            @on-row-dblclick="toggleDetail"></Table>
       <spinner :show="showSpinner"></spinner>
       <table-search class="table-search" :color="barColor" @searchsubmit="reFetchData"></table-search>
    </figure>
</template>
<script>
import { log_get_srcip } from '@/api/demo'
import Spinner from '@/components/Spinner'
import TableSearch from '@/components/TableSearch'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
export default {
  name: 'LogTable',
  components:{Spinner, TableSearch},
  props:['height','filter','cacheData'],
  data(){
      return {
          showSpinner: true,
          title:'Top Threat',
          barColor: barColor,
          columns: [
            {
                title: 'Date/Time',
                key: 'itime'
            },
            {
                title: 'Device',
                key: 'devid'
            },
            {
                title: 'Source',
                key: 'srcip',
                render: (h, params) => {
                    return h('span', {attrs:{class: ''}},
                        [
                            //h('Avatar', {props:{'src': params.row.avatar}}),
                            h('Avatar', {props:{'src': `static/images/avatar/avatar-${params.row.avatarid}.jpg`}}),
                            h('span', {attrs:{class: 'icon-text'}},`${params.row.user} (${params.row.srcip})`)
                        ],

                    )

                }
            },
            {
                title: 'Destination',
                key: 'desip'
            },
            {
                title: 'Action',
                key: 'action'
            },
            {
                title: 'Service',
                key: 'service'
            },
            {
                title: 'Application',
                key: 'app'
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
        data1: [],
      }
  },
  mounted(){
    if(this.cacheData.length){
        this.showSpinner = false;
        this.data1 = this.cacheData;
    } else {
        this.fetchData().then(
            //this.hideSpinner()
        );
    }
  },
  updated(){
  },
  methods:{
      hideSpinner(){
        setTimeout(() => {
            this.showSpinner = false
        }, 1000);
      },
      fetchData(){
          return log_get_srcip({user: this.filter.user,srcip: this.filter.srcip, avatarid: this.filter.avatarid}).then(
              res=>{
                  var data = res.data.data.rows
                  this.data1 = data.map(function(row){
                      var keys = Object.keys(row);
                      keys.forEach(function(key){
                          if(key === "bandwidth"){
                              row[key].total = row[key].in + row[key].out
                          }
                      });
                      return row;
                  })
                  this.data1 = this.sortData(this.data1);
                  this.hideSpinner()
              }
          )
      },
      sortData(arr){
        return arr.sort(function (a, b) {
            var aDevid = a.devid;
            var bDevid = b.devid;
            var aItime = a.itime;
            var bItime = b.itime;

            if(aItime == aItime)
            {
                return (aDevid < bDevid) ? -1 : (aDevid > bDevid) ? 1 : 0;
            }
            else
            {
                return (bItime < bItime) ? -1 : 1;
            }
        });

      },
      toggleDetail(row, index){
          this.$emit('toggle-detail', {
                row: row, 
                index:index, 
                cacheData: this.data1,
                });
      },
      changeRow(row, index){
          this.$emit('change-row', {
                row: row, 
                index:index, 
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
     tableHeight: function(){
          console.log('log table computed item height', this.height);
         return this.height || 630;
     }

  }

    
}
</script>
<style lang="less" scoped>
.table-container{
    height: 100%;
    position: relative;
}

</style>


