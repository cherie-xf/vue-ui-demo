<template>
  <v-app class="app">
    <sidebar></sidebar>
    <navbar></navbar>
    <v-navigation-drawer temporary :value="leftdrawer" fixed></v-navigation-drawer>
    <v-navigation-drawer temporary :value="rightdrawer" right fixed class="right-drawer">
      <div class="user-avatar" @click.stop="toggleRightDrawer">
          <v-badge overlap>
            <span slot="badge">3</span>
            <v-avatar color="purple red--after">
              <img src="https://vuetifyjs.com/static/doc-images/john.jpg" alt="John">
            </v-avatar>
          </v-badge>
      </div>
    </v-navigation-drawer>
    <v-content>
        <v-jumbotron :gradient="gradient" :height="`100%`">
          <v-container fluid fill-height>
              <app-main></app-main>
          </v-container>
        </v-jumbotron>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import SvgIcon from '@/components/SvgIcon.vue'// svg组件

export default {
  name:'Layout',
  components: { Navbar,Sidebar,AppMain, 'svg-icon': SvgIcon },
  data:() => ({
    //gradient:'to top, #cfd9df 0%, #e2ebf0 100%',
    //gradient:'to top, #a8edea 0%, #fed6e3 100%',
  }),
  computed: {
    ...mapGetters([
      'sidebar',
      'leftdrawer',
      'rightdrawer',
      'gradient'
    ]),
    routes() {
      return this.$router.options.routes
    },
  },
  methods: {
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRight')
    },
  }
}
</script>
<style lang="less" scoped>
  .right-drawer{
    overflow: initial;
  }
  .user-avatar {
    cursor: pointer;
    background-color: rgba(204, 204, 204, 0.8);
    position: absolute;
    top: 15px;
    left: -100px;
    width:100px;
    height: 50px;
    display: flex;
    align-content: center;
    border-bottom-left-radius: 30px; 
    border-top-left-radius: 30px;
  }

</style>
