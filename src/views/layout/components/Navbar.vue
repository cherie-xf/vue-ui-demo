<template>
    <v-toolbar color="" height="50" light fixed app>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <my-breadcrumb></my-breadcrumb>
      <v-spacer></v-spacer>
      <span class="setting-icon" @click.stop="toggleRightDrawer">
        <svg-icon :icon-class="`settings`" :class-name="'settings'" ></svg-icon>
      </span>
    </v-toolbar>
</template>
<script>
import { mapGetters } from 'vuex'
import MyBreadcrumb from '@/components/Breadcrumb.vue'
import Hamburger from '@/components/Hamburger.vue'

export default {
  name: 'NavBar',
  data () {
    return {
        theme1: 'light'
    }
  },
  components: {
    MyBreadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'rightdrawer',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    toggleRightDrawer() {
      this.$store.dispatch('ToggleRight')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>