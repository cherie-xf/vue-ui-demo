<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+item.children[0].path "
        :key="item.children[0].name">
        <MenuItem 
          :name="item.name || item.name+'-'+item.children[0].name"
          :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <div class="my-content my-content-title">
            <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon" :class-name="'sidebar icon-shadow'" ></svg-icon>
            <span class="my-text" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
          </div>
        </MenuItem>
      </router-link>

      <Submenu :name="item.name" v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <div class="my-content my-content-title">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" :class-name="'sidebar icon-shadow'"></svg-icon>
            <span class="my-text" v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
            <div class="my-content-number">{{item.children.length}}</div>
          </div>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <MenuItem :name="item.name+'-'+child.name" :index="item.path+'/'+child.path">
              <div class="my-content my-content-subtitle">
                <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon" :class-name="'sidebar small icon-shadow'"></svg-icon>
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
<style lang="less">
.flex-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.menu-wrapper{
  .ivu-icon{
    display: none;
  }

}

.my-content:extend(.flex-center){
  justify-content: flex-start;
  &.my-content-title {
    height: 30px;
    width: 100%;
    padding: 0 5px;
    .selected{
      //background-color: @sbarOpenBg
    }
    &:hover{
      //background-color: #f1f3f4;
    }
  }
  &.my-content-subtitle{
    height: 30px;
    width: 100%;
  }
  .my-text{
    flex-grow: 1;
    margin-left: 5%;
    white-space: nowrap;
  }
}
  .my-content-number:extend(.flex-center){
    font-size: 0.9em;
    width: 18px;
    height: 18px;
    color:white;
    border-radius: 50%;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
  }
</style>

