<template>
  <v-app>

    <v-navigation-drawer 
      :mini-variant.sync="isSideBarOpen"  
      :mini-variant-width="40"  
      class="sidebar" 
      :value="true" app>
      <div class="nav-title">
      <span class="setting-icon" @click.stop="toggleLeftDrawer">
        <svg-icon :icon-class="`fortiview`" :class-name="'fortiview'" ></svg-icon>
      </span>
      <span class="title-text">Fortiview</span>

      </div>
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
      <span class="setting-icon" @click.stop="toggleRightDrawer">
        <svg-icon :icon-class="`settings`" :class-name="'settings'" ></svg-icon>
      </span>
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
      console.log('side bar', !this.sidebar.opened);
      return !this.sidebar.opened
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
    .setting-icon {
        cursor: pointer;
    }
    .sidebar {
      .nav-title{
        height: 50px;
        &:extend(.flex-center);
      }
      &.navigation-drawer--mini-variant {
        .title-text {
          display: none;
        }

      }
    }
</style>
