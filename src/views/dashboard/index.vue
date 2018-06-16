<template>
  <div class="dashboard-container">
    <BackTop></BackTop>
      <grid-layout
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
            <bar-chart v-if="isGridReady && item.type ==='bar'"></bar-chart>
            <pie-chart v-if="isGridReady && item.type ==='pie'"></pie-chart>
            <line-chart v-if="isGridReady && item.type ==='line'"></line-chart>
            <bar-line v-if="isGridReady && item.type ==='barline'"></bar-line>
            <map-chart v-if="isGridReady && item.type ==='map'"></map-chart>
        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
import BarChart from '@/components/Charts/BarChart.vue'
import PieChart from '@/components/Charts/PieChart.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import BarLine from '@/components/Charts/BarLineChart.vue'
import MapChart from '@/components/Charts/MapChart.vue'
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
var testLayout = [
	    {"x":0,"y":0,"w":4,"h":4,"i":"0", type:'bar'},
	    {"x":4,"y":0,"w":4,"h":4,"i":"1", type:'pie'},
	    {"x":8,"y":0,"w":4,"h":4,"i":"2", type:'line'},
	    {"x":0,"y":4,"w":4,"h":4,"i":"3", type:'barline'},
	    {"x":4,"y":4,"w":4,"h":4,"i":"4", type:'bar'},
	    {"x":8,"y":4,"w":4,"h":4,"i":"5", type:'map'},
	    {"x":0,"y":8,"w":4,"h":4,"i":"6"},
	    {"x":4,"y":8,"w":4,"h":4,"i":"7"},
	    {"x":8,"y":8,"w":4,"h":4,"i":"8"},
	];

export default {
  name: 'dashboard',
  components: { GridLayout, GridItem, BarChart, PieChart, LineChart, BarLine, MapChart},
  data: () => ({
    layout: testLayout,
    gridRowHeight: 30,//default value
    isGridReady: false,
  }),
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted(){
    var height = $(this.$el).closest('.app-main').height() - (10 * 5);// suppose 5 row 4 gap(10px)
    console.log('height', height);
    this.gridRowHeight = Math.floor(height/(4.5 * 3)); // 3 row of each height 4.5 times of set height px
    this.$nextTick(()=>{
      this.isGridReady = true;
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
    },
  }
}
</script>

<style lang="less" scoped>
  .dashboard-container{
    height: 100%;
  }

</style>