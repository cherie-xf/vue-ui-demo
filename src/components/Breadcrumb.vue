<template>
  <Breadcrumb class="app-breadcrumb" separator="/">
    <BreadcrumbItem v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
      <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
      <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
    </BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
    export default {
        
    }
</script>

</template>

<script>
export default {
  name: 'Mybreadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="less" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
