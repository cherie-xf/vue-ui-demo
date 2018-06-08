<template>
    <v-app>
        <v-navigation-drawer :mini-variant.sync="isSideBarOpen" stateless hide-overlay class="sidebar" :value="true">
            <v-list dense>
                <v-list-tile @click.stop="toggleLeftDrawer">
                <v-list-tile-action>
                    <v-icon>exit_to_app</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer temporary :value="isLeftDrawerOpen" fixed ></v-navigation-drawer>
        <v-toolbar color="" dark fixed app clipped-right >
            <v-toolbar-side-icon @click.stop="toggleSideBar"></v-toolbar-side-icon>
            <v-toolbar-title>Toolbar</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="toggleRightDrawer"></v-toolbar-side-icon>
        </v-toolbar>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
//import SidebarItem from './SidebarItem'

export default {
  //components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'leftdrawer',
      'rightdrawer'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isSideBarOpen() {
      return this.sidebar.opened
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
      this.$store.dispatch('ToggleLeftDrawer')
    },
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRightDrawer')
    },
  }
}
</script>
