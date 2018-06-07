<template>
  <Menu mode="horizontal" :theme="theme1" active-name="1">
  <myhamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></myhamburger>
  <breadcrumb></breadcrumb>
    <MenuItem name="1">
      <Icon type="ios-paper"></Icon>
      test menu item
    </MenuItem>
  </Menu>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Myhamburger from '@/components/Hamburger.vue'

export default {
  data () {
    return {
        theme1: 'light'
    }
  },
  components: {
    Breadcrumb,
    Myhamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>