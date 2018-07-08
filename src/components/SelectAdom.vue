<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <div class="dialog-container">
            <div class="toolbar-container">
                <div class="title">Select an ADOM</div>
                <v-btn :color="color.in" fab small @click="cancel" class="back-btn">
                    <svg-icon :icon-class="`goback`" :class-name="`goback small`"></svg-icon>
                </v-btn>
            </div>
            <div class="sub-title">Recently selected ADOM(s)</div>
            <div class="cards-container">
                <div class="card-wrapper" v-for="ad in recentAdoms" :key="'re-'+ad.name" 
                :class="{'current-adom':ad.name === currentAdom}">
                    <Card>
                      <i slot="title">{{ad.name}} ( {{ad.devices.length}} )</i>
                        <Button v-show="ad.name !== currentAdom" slot="extra" 
                        type="ghost" shape="circle" size="small" 
                        @click.prevent="adomSelect(ad.name)">Select</Button>
                      <div class="my-row">
                          <div class="my-title">Firmware Version</div>
                          <div class="my-value">{{ad.version}}</div>
                      </div>
                      <div class="my-row">
                          <div class="my-title">Allocated Storage</div>
                          <div class="my-value">{{ad.storage}}</div>
                      </div>
                      <Tree :data="ad.deviceTree" :render="renderContent"></Tree>
                    </Card>
                </div>
            </div>
            <v-divider></v-divider>

            <div class="sub-title">All ADOM(s)</div>
            <div class="cards-container">
                <div class="card-wrapper" v-for="ad in adoms" :key="ad.name" 
                @click="adomSelect(ad.name)"
                :class="{'current-adom':ad.name === currentAdom}">
                    <Card>
                      <i slot="title">{{ad.name}} ( {{ad.devices.length}} )</i>
                        <Button v-show="ad.name !== currentAdom" slot="extra" 
                        type="ghost" shape="circle" size="small" 
                        @click.prevent="adomSelect(ad.name)">Select</Button>
                      <div class="my-row">
                          <div class="my-title">Firmware Version</div>
                          <div class="my-value">{{ad.version}}</div>
                      </div>
                      <div class="my-row">
                          <div class="my-title">Allocated Storage</div>
                          <div class="my-value">{{ad.storage}}</div>
                      </div>
                      <Tree :data="ad.deviceTree" :render="renderContent"></Tree>
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

import { mapGetters } from 'vuex'
export default {
    name: 'SelectAdom',
    props: ['showAdom'],
    data(){
        return {
            color: barColor,
            adomData: adomData,
        }
    },
    computed:{
        ...mapGetters([
            'adom',
            'currentAdom'
        ]),
        dialog(){
            return this.showAdom
        },
        adoms(){
            return this.formatAdomData(this.adomData);
        },
        recentAdoms(){
            /*
            return  this.adoms.filter(ad=>{
                console.log('recent adoms', this.adom.recent, ad.name);
                return this.adom.recent.indexOf(ad.name) > -1;
            } )
            */
            var reAdoms = []
            this.adom.recent.map(ad=>{
                 var reAdom = this.adoms.find(adom=>{return adom.name === ad})
                 if(reAdom){
                     reAdoms.push(reAdom)
                 }
            })
            return reAdoms
        }
    },
    created(){
        console.log('all adoms', this.adoms, 're adoms', this.recentAdoms);
    },
    methods:{
        adomSelect(name){
            this.$store.dispatch('SelectAdom', {adom: name})
            this.$emit('adomselect', {adom: name})
        },
        cancel(){
            this.$emit('adomselect')
        },
        formatAdomData(adoms){
            var arr = Object.values(adoms);

            //for ([name, adom] of Object.entries(adoms)){
                arr.map(adom =>{
                    var tree = [{
                        title: adom.devices.length + '  Devices',
                        status: 'title',
                        children:[]
                    }]
                    adom.devices.map(device => {
                        tree[0].children.push({title: device.name, status: device.status})
                    }, this)
                    adom.deviceTree = tree;
                })
            //}
            return arr
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
        background-color: #fafafa;
        height: 100%;
        padding: 30px;
        overflow: auto;
    }
    .toolbar-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .title{
            flex-grow: 1;
        }
    }
    .cards-container{
      display: grid;
      grid-gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      margin-bottom: 30px;
    }
    .card-wrapper{
        &.current-adom{
            .ivu-card{
                background-color: #80CBC4;
                color: white
            }
        }
    }
    .sub-title{
        margin: 20px 0;
        font-size: 1.1em;
        color: #333;
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


