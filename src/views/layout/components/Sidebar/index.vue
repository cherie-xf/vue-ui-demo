<template>
    <v-navigation-drawer 
      :mini-variant.sync="isCollapse"  
      :mini-variant-width="40"  
      class="sidebar" 
      :value="true" app>
      <div class="nav-top" @click.stop="toggleLeftDrawer">
        <v-jumbotron :gradient="topBgColor" height="50px">
          <div class="nav-title">
              <span class="setting-icon">
                <svg-icon :icon-class="`fortiview`" :class-name="'fortiview'" class="big"></svg-icon>
              </span>
              <span class="title-text">Fortiview</span>
          </div>
        </v-jumbotron>
      </div>
        <v-list class="pt-0 list-content" dense>
        <v-jumbotron :gradient="gradient" :height="`100%`">
          <v-divider></v-divider>
            <Menu ref="side_menu" mode="vertical" width="auto" class="side-menu" 
            :open-names="openMenuIndxs" :active-name="activeMenuName" :accordion="true"
             @on-select="select" :on-open-change="this.test=true">
                <sidebar-item :routes="routes"></sidebar-item>
            </Menu>
        </v-jumbotron>
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
          //gradient:'to top, #a8edea 0%, #fed6e3 100%',
      }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'gradient',
      'topBgColor'
    ]),
    routes() {
        console.log(this.$router.options.routes);
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    },
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
            //console.log(this.$refs);
            $(this.$el).find('.ivu-menu-submenu .ivu-menu-item').css('padding-left', '20%');
            //this.$refs.side_menu.open_names=[];
            //this.openMenuIndxs=[];
            //this.updateMenu();
        }
      },
      gradient(nv){
        console.log('gradient change', nv);
      }
  },
  mounted(){
    if(this.isCollapse){
      $(this.$el).find('.ivu-menu-submenu .ivu-menu-item').css('padding-left', '20%');
      console.log('gradient: ', this.gradient);
    }      
  }
}
</script>
<style lang="less">
@sbarFontColor: #495060;
.flex-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.multiple-light-shadow{ 
    text-shadow:2px 8px 6px rgba(0,0,0,0.2),
        0px -5px 35px rgba(255,255,255,0.3);
}
.emboss-shadow{
  text-shadow: 2px 8px 6px rgba(0,0,0,0.2),
                 0px -5px 35px rgba(255,255,255,0.3);
}
.ivu-menu-light{
  background: initial;
}
.ivu-menu-vertical.ivu-menu-light:after{
  width:0px;
}
    .sidebar {
      padding: 0px;
      .nav-title:extend(.flex-center){
        width: 100%;
        height: 100%;
        justify-content: flex-start;
        cursor: pointer;
        margin-left:5%;
        font-size: 1.2em;
        height: 50px;
        .title-text:extend(.multiple-light-shadow) {
          margin-left: 5%;
          color:@sbarFontColor;
          font-size: 1.2em;
          font-weight: 700;
        }
      }
      .pt-0{
        padding: 0px;
      }
      .list-content{
        height:~"calc(100% - 50px)";
        .side-menu{
          margin-top: 10px;
        }
      }
      &.navigation-drawer--mini-variant {
        .title-text {
          display: none;
        }

      }
    }
</style>
