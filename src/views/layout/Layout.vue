<template>
  <v-app>

    <v-navigation-drawer 
      :mini-variant.sync="isSideBarOpen"  
      :mini-variant-width="40"  
      class="sidebar" 
      :value="true" app>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar @click.stop="toggleLeftDrawer">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="item in items" :key="item.title" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer temporary v-model="leftdrawer" fixed></v-navigation-drawer>
    <v-navigation-drawer temporary v-model="rightdrawer" right fixed></v-navigation-drawer>
    <v-toolbar color="" height="50" light fixed app>
      <myhamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></myhamburger>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <svg-icon :icon-class="`settings`" :class-name="'settings'" @click.stop="toggleRightDrawer"></svg-icon>
    </v-toolbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Myhamburger from '@/components/Hamburger.vue'
import SvgIcon from '@/components/SvgIcon.vue'// svg组件
//import SidebarItem from './SidebarItem'

export default {
  //components: { SidebarItem },
  components: { Myhamburger, 'svg-icon': SvgIcon },
  data:() => ({
    leftdrawer: false,
    rightdrawer: false,
    items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
    ],
  }),
  computed: {
    ...mapGetters([
      'sidebar',
      //'leftdrawer',
      //'rightdrawer'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isSideBarOpen() {
      return !this.sidebar.opened
    },
    isLeftDrawerOpen() {
      return !this.leftdrawer.opened
    },
    isRightDrawerOpen() {
      return !this.rightdrawer.opened
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    toggleLeftDrawer() {
      //this.$store.dispatch('ToggleLeftDrawer')
      this.leftdrawer = ! this.leftdrawer;
    },
    toggleRightDrawer() {
      //this.$store.dispatch('ToggleRightDrawer')
      this.rightdrawer = ! this.rightdrawer;
    },
  }
}
</script>
<style lang="less" scoped>
    .svn-icon{
        &.settings{
            animation: fa-spin 2s infinite linear 
        }
    }
    @keyframes fa-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg)
    }
}
</style>
