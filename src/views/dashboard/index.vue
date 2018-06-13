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
            :use-css-transforms="true">

        <grid-item v-for="item in layout"
        :key="item.i"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
        </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueGridLayout from 'vue-grid-layout'
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
var testLayout = [
	    {"x":0,"y":0,"w":4,"h":4,"i":"0"},
	    {"x":4,"y":0,"w":4,"h":4,"i":"1"},
	    {"x":8,"y":0,"w":4,"h":4,"i":"2"},
	    {"x":0,"y":4,"w":4,"h":4,"i":"3"},
	    {"x":4,"y":4,"w":4,"h":4,"i":"4"},
	    {"x":8,"y":4,"w":4,"h":4,"i":"5"},
	    {"x":0,"y":8,"w":4,"h":4,"i":"6"},
	    {"x":4,"y":8,"w":4,"h":4,"i":"7"},
	    {"x":8,"y":8,"w":4,"h":4,"i":"8"},
	];

export default {
  name: 'dashboard',
  components: { GridLayout, GridItem },
  data: () => ({
    layout: testLayout,
    gridRowHeight: 30,//default value
    cards: [
      { title: 'Pre-fab homes', src: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg', flex: 12 },
      { title: 'Favorite road trips', src: 'https://vuetifyjs.com/static/doc-images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://vuetifyjs.com/static/doc-images/cards/plane.jpg', flex: 6 }
    ]
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
  }
}
</script>

<style lang="less" scoped>
  .dashboard-container{
    height: 100%;
  }

</style>