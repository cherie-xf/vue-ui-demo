<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <div class="dialog-container">
            <div class="toolbar-container">
                <v-btn :color="color.in" fab small @click="adomSelect" class="back-btn">
                    <svg-icon :icon-class="`goback`" :class-name="`goback small`"></svg-icon>
                </v-btn>
            </div>
            <div class="cards-container">
                <div class="card-wrapper" v-for="adom in adoms" :key="adom.name">
                    <Card>
                      <p slot="title">{{adom.name}} ( {{adom.devices.length}} )</p>
                      <div class="my-row">
                          <div class="my-title">Firmware Version</div>
                          <div class="my-value">{{adom.version}}</div>
                      </div>
                      <div class="my-row">
                          <div class="my-title">Allocated Storage</div>
                          <div class="my-value">{{adom.storage}}</div>
                      </div>
                      <Tree :data="adom.deviceTree" :render="renderContent"></Tree>
                    </Card>
                </div>
            </div>

        </div>
    </v-dialog>
</template>
<script>
const barColor = {
    'in': 'teal lighten-2',
    'out': 'teal lighten-4',
}
const adomData = {
    GUI: {
        name: 'GUI',
        version: 'FortiGate',
        storage: '5GB',
        devices:[
          {
              name: 'FGT1KC0000000001',
              status : 'up',
          },
          {
              name: 'FGT1KC0000000002',
              status : 'down',
          },
          {
              name: 'FGT1KC0000000003',
              status : 'up',
          },
        ]
    },
    csf: {
        name: 'csf',
        version: 'FortiGate',
        storage: '2TB',
        devices:[
          {
              name: 'FGT91E-1',
              status : 'down',
          },
          {
              name: 'FGT91E-2',
              status : 'up',
          },
          {
              name: 'FGT91E-3',
              status : 'up',
          },
          {
              name: 'FGT91E-4',
              status : 'up',
          },
          {
              name: 'FGT91E-5',
              status : 'up',
          },
        ]
    },
    fsa: {
        name: 'fsa',
        version: 'FortiGate',
        storage: '1TB',
        devices:[
          {
              name: 'FGT600C-1',
              status : 'up',
          },
          {
              name: 'FGT600C-2',
              status : 'up',
          },
        ]
    },
    root: {
        name: 'root',
        version: 'FortiGate',
        storage: '1TB',
        devices:[
          {
              name: 'FGT1KC0000000001',
              status : 'down',
          },
          {
              name: 'FGT1KC0000000002',
              status : 'down',
          },
          {
              name: 'FGT1KC0000000003',
              status : 'up',
          },
        ]
    },
    Corp: {
        name: 'Corp',
        version: 'FortiGate',
        storage: '10TB',
        devices:[
          {
              name: 'Van_Office_1',
              status : 'up',
          },
          {
              name: 'Van_Office_2',
              status : 'up',
          },
          {
              name: 'Van_Office_3',
              status : 'up',
          },
          {
              name: 'Van_Office_4',
              status : 'up',
          },
          {
              name: 'Van_Office_5',
              status : 'up',
          },
        ]
    },
    My_FGT: {
        name: 'My_FGT',
        version: 'FortiGate',
        storage: '5TB',
        devices:[
          {
              name: 'FGT111',
              status : 'up',
          },
          {
              name: 'FGT222',
              status : 'up',
          },
          {
              name: 'FGT333',
              status : 'up',
          },
          {
              name: 'FGT444',
              status : 'up',
          },
        ]
    },
    PM_Log: {
        name: 'PM_Log',
        version: 'FortiGate',
        storage: '2TB',
        devices:[
          {
              name: 'FGT1KC0000000004',
              status : 'down',
          },
          {
              name: 'FGT1KC0000000005',
              status : 'down',
          },
          {
              name: 'FGT1KC0000000006',
              status : 'down',
          },
        ]
    },

}
export default {
    name: 'SelectAdom',
    props: ['showAdom'],
    data(){
        return {
            color: barColor,
            adoms: adomData,
        }
    },
    computed:{
        dialog(){
            return this.showAdom
        }
    },
    created(){
      this.formatAdomData(this.adoms);

    },
    methods:{
        adomSelect(){
            this.$emit('adomselect', {adom: 'test'})
        },
        formatAdomData(adoms){
            for ([name, adom] of Object.entries(adoms)){
                var tree = [{
                    title: adom.devices.length + '  Devices',
                    status: 'title',
                    children:[]
                }]
                adom.devices.map(device => {
                    tree[0].children.push({title: device.name, status: device.status})
                }, this)
                console.log('device tree', tree)
                adom.deviceTree = tree;
            }
        },
      renderContent (h, { root, node, data }) {
        var treeClass = data.parent? 'tree-title' : 'tree-parent tree-title' 
        return h('span', {
            attrs:{class: 'tree-row'},
        }, 
            [
                h('svg-icon', {attrs:{'icon-class': data.status}, style:{width: '16px', height: '16px'}}),
                h('span', {attrs:{class: treeClass}},data.title),
            ],
        )
      },
    }
}
</script>
<style lang="less" scoped>
    .dialog-container{
        background-color: white;
        height: 100%
    }
    .toolbar-container{
        display: flex;
        justify-content: flex-end;
    }
    .cards-container{
      padding: 30px;
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))
    }
    .my-row{
        display: flex;
        font-size: 0.9em;
        margin-bottom: 10px;
        .my-title{
            flex-grow: 1;
            font-weight: 550;
        }
        .my-value{
            width: 100px;
        }
        .tree-row{
            display: flex;
            align-items: center;
            .svg-icon{
                width: 16px;
                height: 16px;
            }
        }
    }


</style>


