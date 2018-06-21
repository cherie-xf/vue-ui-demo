<template>
    <figure class="table-container">
    <Tabs value="name1">
        <TabPane label="table 1" name="name1" class="tab-pane">
            <Table :columns="columns1" :data="data1" :height="tableHeight" size="small"></Table>
        </TabPane>
        <TabPane label="table 2" name="name2">
            <Table :columns="columns1" :data="data1" :height="tableHeight" size="small"></Table>
        </TabPane>
        <TabPane label="table 3" name="name3">
            <Table :columns="columns1" :data="data1" :height="tableHeight" size="small"></Table>
        </TabPane>
    </Tabs>
    </figure>
</template>

<script>

export default {
  name: 'DrilldownTable',
  props:['height'],
  data(){
      return {
          columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
      }
  },
  mounted(){
  },
  computed:{
     tableHeight: function(){
        console.log('drilldown computed item height', this.height);
        var tabBarHeight = $(this.$el).find('.ivu-tabs-bar').height() || 37 // only available after mounted
        return this.height - tabBarHeight;
     }
  },
  methods:{
  }
}
</script>


<style lang="less">
/* should not be scoped for overwrite ive style*/
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
