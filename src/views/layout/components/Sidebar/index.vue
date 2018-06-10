<template>
    <v-navigation-drawer 
      :mini-variant.sync="isCollapse"  
      :mini-variant-width="40"  
      class="sidebar" 
      :value="true" app>
      <div class="nav-title" @click.stop="toggleLeftDrawer">
      <span class="setting-icon">
        <svg-icon :icon-class="`fortiview2`" :class-name="'fortiview'" ></svg-icon>
      </span>
      <span class="title-text">Fortiview</span>

      </div>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
            <Menu mode="vertical">
                <sidebar-item :routes="routes"></sidebar-item>
            </Menu>
        </v-list>
    </v-navigation-drawer>

</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
        console.log(this.$router.options.routes);
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="less">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
    .sidebar {
      .nav-title{
        &:extend(.flex-center);
        justify-content: flex-start;
        cursor: pointer;
        margin-left:5%;
        font-size: 1.2em;
        height: 50px;
        .title-text {
          margin-left: 5%;
        }
      }
      &.navigation-drawer--mini-variant {
        .nav-title{

        }
        .title-text {
          display: none;
        }

      }
    }
</style>
