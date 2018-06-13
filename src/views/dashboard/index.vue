<template>
  <div class="dashboard-container">
    <!--
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' 
      :key='role'>{{ role }}</span></div>
      -->
      <!--
      <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex
                v-for="card in cards"
                v-bind="{ [`xs${card.flex}`]: true }"
                :key="card.title" >
                <v-card>
                  <v-card-media
                    :src="card.src"
                    height="200px"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline white--text" v-text="card.title"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>share</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card>
      -->
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