<template>
  <div class="dashboard-container">
    <!--
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' 
      :key='role'>{{ role }}</span></div>
      -->
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data: () => ({
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
  }
}
</script>

<style lang="less" scoped>

</style>