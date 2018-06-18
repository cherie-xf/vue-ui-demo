
<template>
  <div class="list-container">
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

        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
import MapChart from '@/components/Charts/MapChart.vue'
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
var testLayout = [
	    {"x":0,"y":0,"w":12,"h":1,"i":"0", type:'search'},
	    {"x":0,"y":1,"w":12,"h":3,"i":"1", type:'barline'},
	    {"x":0,"y":4,"w":12,"h":4,"i":"2", type:'list_table'},
	    {"x":0,"y":8,"w":12,"h":4,"i":"3", type:'drilldown_table'},
	    {"x":4,"y":12,"w":12,"h":4,"i":"4", type:'logview_table'},
	    {"x":8,"y":16,"w":12,"h":4,"i":"5", type:'logview_detail'},
  ];
export default {
  name: 'dashboard',
  components: { GridLayout, GridItem},
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
    this.gridRowHeight = Math.max(Math.floor(height/(4.5 * 3)), 35); // 3 row of each height 4.5 times of set height px , min-height 35px
    console.log('container height', height, 'gride row height', this.gridRowHeight);
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
  .list-container{
    height: 100%;
  }

</style>