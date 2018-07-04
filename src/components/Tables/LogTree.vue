<template>
    <figure class="tree-container">
        <Tree :data="data1" :render="renderContent"></Tree>
    </figure>
    
</template>
<script>
export default {
  name:'LogTree',
  props:['treeData','filter'],
  data(){
      return {
          data1:[],
          columns: [
            {
                title: 'Date/Time',
                key: 'itime'
            },
            {
                title: 'Device',
                key: 'devid',
                parent: 'Source',
            },
            {
                title: 'Source',
                key: 'srcip',
                parent: 'Source',
            },
            {
                title: 'Destination',
                key: 'desip',
                parent: 'Destination',
            },
            {
                title: 'Action',
                key: 'action',
                parent: 'Action',
            },
            {
                title: 'Service',
                key: 'service',
                parent: 'Application',
            },
            {
                title: 'Application',
                key: 'app',
                parent: 'Application',
            },
            {
                title: 'Level',
                key: 'level',
                parent: 'Security',
            },
            {
                title: 'Threat Level',
                key: 'threatLevel',
                parent: 'Security',
            },
            {
                title: 'Device Name',
                key: 'devname',
                parent: 'Source',
            },
            {
                title: 'Source Interface',
                key: 'interface',
                parent: 'Source',
            },
            {
                title: 'Source Port',
                key: 'port',
                parent: 'Source',
            },
            {
                title: 'Unauthorized User',
                key: 'user',
                parent: 'Source',
            },
            {
                title: 'Policy ID',
                key: 'policyid',
                parent: 'Action',
            },
            {
                title: 'Duration',
                key: 'duration',
                parent: 'Data',
            },
            {
                title: 'Received Packets',
                key: 'rpackets',
                parent: 'Data',
            },
            {
                title: 'Sent Packets',
                key: 'spackets',
                parent: 'Data',
            },
            {
                title: 'Log ID',
                key: 'logid',
                parent: 'General',
            },
            {
                title: 'Session ID',
                key: 'sessionid',
                parent: 'General',
            },
            {
                title: 'Time Stamp',
                key: 'time',
                parent: 'General',
            },
            {
                title: 'Virtual Domain',
                key: 'vdom',
                parent: 'General',
            },
            {
                title: 'Destination Country',
                key: 'country',
                parent: 'Destination',
            },
            {
                title: 'Destination Port',
                key: 'destport',
                parent: 'Destination',
            },
            {
                title: 'Destination Interface',
                key: 'destinter',
                parent: 'Destination',
            },
            {
                title: 'Sub Type',
                key: 'subtype',
                parent: 'Type',
            },
            {
                title: 'Type',
                key: 'type',
                parent: 'Type',
            },
          ],
      }
  },
  computed:{
      oData(){
              return this.treeData
      }

  },
  watch:{
      'oData': function(nv){
              var map = this.getTreeMap(nv);
              this.data1 = this.getFormatData(map);

      }

  },
  created(){
    var map = this.getTreeMap(this.oData);
    this.data1 = this.getFormatData(map);
  },
  methods:{
      getTreeMap(data){
        var treeMap = new Map();
        treeMap.set('Security', []);
        treeMap.set('Source', []);
        treeMap.set('Action', []);
        treeMap.set('Data', []);
        treeMap.set('General', []);
        treeMap.set('Destination', []);
        treeMap.set('Application', []);
        treeMap.set('Type', []);
        var keys = Object.keys(data);
        keys.forEach(key => {
            var col = this.columns.find(col =>{return col.key === key})
            if( col && col.parent && treeMap.has(col.parent)){
                treeMap.get(col.parent).push({
                    title: col.title, 
                    value: data[key],
                    parent: col.parent,
                })
            }
        }, this);
        return treeMap;
      },
      getFormatData(map){
        var res = [];
        for (var [key, value] of map) {
            res.push({
                title: key,
                expand: true,
                children: value,
            })
        }
        return res;
      },
      renderContent (h, { root, node, data }) {
        var treeClass = data.parent? 'tree-title' : 'tree-parent tree-title' 
        return h('span', {attrs:{class: 'tree-row'}}, 
            [
                h('span', {attrs:{class: treeClass}},data.title),
                h('span', {attrs:{class: 'tree-value'}},data.value)
            ],
        )
      },

  }
}
</script>
<style lang="less">
.tree-container{
    height: 100%;
    padding: 20px;
    overflow: auto;
    .tree-title{
        margin-right: 10px;
        font-weight: 600;
    }
    .tree-parent{
        font-weight: 400;
    }
}

</style>


