<template>
  <v-app class="app">
    <sidebar></sidebar>
    <navbar></navbar>
    <v-navigation-drawer temporary :value="leftdrawer" fixed></v-navigation-drawer>
    <v-navigation-drawer temporary :value="rightdrawer" right fixed></v-navigation-drawer>
    <v-content class="content">
      <v-container fluid fill-height>
        <app-main></app-main>
      </v-container>
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
    items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
    ],
  }),
  computed: {
    ...mapGetters([
      'sidebar',
      'leftdrawer',
      'rightdrawer'
    ]),
    routes() {
      return this.$router.options.routes
    },
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
  .container {
    overflow-y: auto;
  }

</style>
