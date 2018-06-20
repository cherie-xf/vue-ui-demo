<template>
    <figure class="table-container">
       <Table :columns="columns1" :data="data1" :height="tableHeight"></Table>
    </figure>
</template>

<script>

export default {
  name: 'ListTable',
  props:['item'],
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
      this.$nextTick(()=>{
        this.resize();
      });
  },
  updated(){
      this.$nextTick(()=>{
        this.resize();
      });
  },
  methods:{
    resize(size){
        if(size){
            if(size.width){
                this.tableWidth = $(this.$el).width();
            }
            if(size.height){
                this.tableHeight = $(this.$el).height();
            }
        } else {
            /*
            this.tableHeight = $(this.$el).height();
            this.tableWidth = $(this.$el).width();
            this.item.height = this.tableHeight;
            this.item.width = this.tableWidth;
            */
           this.item.height = $(this.$el).height();
           this.item.width = $(this.$el).width();
            console.log('init item height width', this.item);
        }
    }
  },
  computed:{
      tableHeight: function(){
          return this.item.height
      },
      tableWidth: function(){
          return this.item.width
      }
  },
  watch:{
      tableHeight: function(nv){
          console.log('list table watch height changed', nv);
      },
      tableWidth: function(nv){
          console.log('list table watch width changed', nv);
      }

      /*
      size:{
          handler: function(nv){
          console.log('list table watch size changed', nv);
        },
        deep: true,
      }
      */
  }
}
</script>

<style lang="less" scoped>
.table-container{
    height: 100%;
}
</style>
