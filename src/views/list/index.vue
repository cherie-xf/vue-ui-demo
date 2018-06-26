
<template>
  <div class="list-container">
    <BackTop></BackTop>
      <div class="list-search">
        <search></search>
      </div>
      <grid-layout
        class="list-grid"
            :layout="layout"
            :col-num="12"
            :row-height="gridRowHeight"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent">

        <grid-item v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @resize="resizeEvent"
          @move="moveEvent"
          @resized="resizedEvent"
          @moved="movedEvent">
          <bar-line v-if="item.type==='barline' && isGridReady"></bar-line>
          <list-table v-if="item.type==='list_table' && isGridReady" 
            @drilldown="drilldown"
            :height="item.height">
            </list-table>
          <dd-table v-if="item.type==='drilldown_table' && isGridReady" :height="item.height"></dd-table>

        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
import ListTable from '@/components/Tables/ListTable'
import DdTable from '@/components/Tables/DrilldownTable'
import BarLine from '@/components/Charts/BarLineChart'
import Search from '@/components/Search'
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
/*
var testLayout = [
	    {"x":0,"y":4,"w":12,"h":3,"i":"0", type:'barline'},
	    {"x":0,"y":4,"w":12,"h":9,"i":"1", type:'list_table'},
  ];
var testLayout2 = [
	    {"x":0,"y":4,"w":12,"h":3,"i":"0", type:'barline'},
	    {"x":0,"y":4,"w":12,"h":4,"i":"1", type:'list_table'},
	    {"x":0,"y":8,"w":12,"h":4,"i":"2", type:'drilldown_table'},
	    {"x":0,"y":12,"w":8,"h":4,"i":"3", type:'logview_table'},
	    {"x":8,"y":12,"w":4,"h":4,"i":"4", type:'logview_detail'},
  ];
  */
export default {
  name: 'dashboard',
  components: { GridLayout, GridItem, ListTable, BarLine, Search, DdTable},
  data: () => ({
    //layout: testLayout2,
    gridRowHeight: 30,//default value
    isGridReady: false,
    level: 'list',
    layout:[],
  }),
  computed: {
    ...mapGetters([
      'layouts'
    ]),
    viewLayouts(){
      return this.layouts['threat']
    },
    testLayout(){
      console.log('test computed', this.level);
      return this.viewLayouts[this.level];
    }
  },
  created(){
    this.layout = this.viewLayouts[this.level]
  },
  mounted(){
    var height = $(this.$el).closest('.app-main').height() - (10 * 5);// suppose 5 row 4 gap(10px)
    this.gridRowHeight = Math.max(Math.floor(height/(4.5 * 3)), 35); // 3 row of each height 4.5 times of set height px , min-height 35px
    console.log('container height', height, 'gride row height', this.gridRowHeight);

    this.$nextTick(()=>{
      this.isGridReady = true;
      this.setSearchSize();
      this.setGridItemSize();
    });

    setTimeout(()=>{
      //this.layout[1].h = 1;
    }, 5000);
  },
  updated(){
    console.log('grid updated');
    this.$nextTick(()=>{
      //this.setGridItemSize();
    });
  },
  methods:{
    layoutUpdatedEvent: function(newLayout){
      console.log("Updated layout: ", newLayout)
    },
    moveEvent: function(i, newX, newY){
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    movedEvent: function(i, newX, newY){
        console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        this.layout[i].width = newWPx
        this.layout[i].height = newHPx
    },
    setSearchSize(){
      var listContainerWidth = $(this.$el).width() - 20
      console.log('list container width', listContainerWidth)
      $(this.$el).find('.list-search').width(listContainerWidth)
    },
    setGridItemSize(){
      var items = $(this.$el).find('.vue-grid-item:not(.vue-grid-placeholder)');
      items.toArray().forEach((item, idx) => {
        console.log('index set grid item size', $(item).width(),$(item).height(), idx);
        this.layout[idx].width = $(item).width(); //width is not correct cause the container size changed after mounted
        this.layout[idx].height = $(item).height();
      });
    },
    drilldown(args){
      console.log('get drilldown event', args)
      this.level = "dd";
      this.layout = this.viewLayouts[this.level]
      this.isGridReady= false;
      this.$nextTick(()=>{
        this.setGridItemSize();
        this.isGridReady= true;
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .list-container{
    height: 100%;
  }
  .list-search{
    position: fixed;
    z-index: 1;
    width: 300px;
    padding: 0 10px;
  }
  .list-grid{
    top: 30px;
  }

</style>
/*
 * Created Date: Wednesday, June 20th 2018, 5:31:21 pm
 * Author: cheriefu
 * 
 * Copyright (c) 2018 Your Company
 */
