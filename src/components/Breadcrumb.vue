<template>
  <Breadcrumb class="app-breadcrumb" separator="/">
    <BreadcrumbItem v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
      <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
      <router-link v-else :to="item.redirect||item.path" class="router-text">{{item.meta.title}}</router-link>
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
  name: 'MyBreadcrumb',
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
.emboss-shadow{
  text-shadow: 2px 8px 6px rgba(0,0,0,0.2),
                 0px -5px 35px rgba(255,255,255,0.3);
}
.multiple-light-shadow{ 
    text-shadow:2px 8px 6px rgba(0,0,0,0.2),
        0px -5px 35px rgba(255,255,255,0.3);
}
  .app-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
    .router-text:extend(.multiple-light-shadow){
      color: #97a8be;
      font-weight: 700;
    }
  }
</style>
