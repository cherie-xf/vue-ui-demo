<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <MenuItem 
          name="item.name"
          :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span class="my-text" v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </MenuItem>
      </router-link>

      <Submenu name="item.name" v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <div class="my-content">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span class="my-text" v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </div>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <MenuItem name="item.name" :index="item.path+'/'+child.path">
              <div class="my-content">
                <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                <span class="my-text" v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
              </div>
            </MenuItem>
          </router-link>
        </template>
      </Submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="less" >
.flex-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
  padding-top: 2px;
  padding-bottom: 2px;
}

.my-content:extend(.flex-center){
  .my-text{
    margin-left: 5%;
    white-space: nowrap;
  }
}
  &.navigation-drawer--mini-variant {
    .ivu-menu-vertical {
      .ivu-menu-item{
        display: none;
      }
      .ivu-menu-submenu-title{
        padding-left: 5%;
        .ivu-menu-submenu-title-icon{
          display: none;
        }

      }
    }
    .my-text {
      display: none;
    }

  }
</style>

