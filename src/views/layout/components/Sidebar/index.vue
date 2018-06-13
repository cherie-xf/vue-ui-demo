<template>
    <v-navigation-drawer 
      :mini-variant.sync="isCollapse"  
      :mini-variant-width="40"  
      class="sidebar" 
      :value="true" app>
      <div class="nav-title" @click.stop="toggleLeftDrawer">
      <span class="setting-icon">
        <svg-icon :icon-class="`fortiview2`" :class-name="'fortiview'" class="big"></svg-icon>
      </span>
      <span class="title-text">Fortiview</span>

      </div>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
            <Menu ref="side_menu" mode="vertical" width="auto" :open-names="openMenuIndxs" :active-name="activeMenuName" :accordion="true"
             @on-select="select" :on-open-change="this.test=true">
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
  data(){
      return {
          openMenuIndxs: [],
          activeMenuName: null,
      }
  },
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
  },
  methods:{
    select (name){
      console.log('name', name);
      //this.activeMenuName = name;
      //var routerItem = this.getRouteItem(name);
      this.updateMenu();
    },
    updateMenu(){
      this.$nextTick(() => {
          this.$refs.side_menu.updateOpened()
          this.$refs.side_menu.updateActiveName()
      })
    },
    toggleLeftDrawer() {
      this.$store.dispatch('ToggleLeft')
      //this.leftdrawer = ! this.leftdrawer;
    },
    getRouteItem(name){
      var names = name.split('-');
      var resItem = null;
      if (name.length > 1){
        var parentName = names[0];
        var childName = names[1];
        var parent = this.$router.find(item => item.name === parentName)
        if(parent && parent.children){
          resItem = parent.children.find(item => item.name === childName)
        }
      } else if(names[0]){
        resItem = this.$router.find(item => item.name === names[0])
      }
      return resItem;
    },
  },
  watch:{
      isCollapse(nv){
        if(nv){
            console.log(this.$refs);
            $(this.$el).find('.ivu-menu-submenu .ivu-menu-item').css('padding-left', '20%');
            //this.$refs.side_menu.open_names=[];
            //this.openMenuIndxs=[];
            //this.updateMenu();
        }
      }
  },
  mounted(){
    if(this.isCollapse){
      $(this.$el).find('.ivu-menu-submenu .ivu-menu-item').css('padding-left', '20%');
    }      
  }
}
</script>
<style lang="less">
.flex-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
    .sidebar {
      .nav-title{
        width: 100%;
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
