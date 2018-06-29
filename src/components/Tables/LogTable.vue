<template>
    <figure class="table-container">
       <Table :columns="columns" 
            :data="data1" 
            :height="tableHeight" 
            size="small" 
            no-data-text="" @on-row-dblclick="toggleDetail"></Table>
       <spinner :show="showSpinner"></spinner>
    </figure>
</template>
<script>
import { log_get } from '@/api/demo'
import Spinner from '@/components/Spinner'
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
export default {
  name: 'LogTable',
  components:{Spinner},
  props:['height'],
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
                key: 'srcip'
            },
            {
                title: 'Destination',
                key: 'destip'
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
                key: 'application'
            },
            {
                title: 'Byte',
                key: 'bandwidth'
            },
          ],
        data1: [],
      }
  },
  mounted(){
    setTimeout(() => {
            this.fetchData().then(
                this.showSpinner = false
            );
        }, 3000);
  },
  updated(){
  },
  methods:{
      fetchData(){
          return log_get().then(
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
                  this.data1 = this.sortData(this.data1);
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
                });
      },
      
  },
  computed:{
     tableHeight: function(){
          console.log('log table computed item height', this.height);
         return this.height;
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


