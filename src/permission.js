import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  //NProgress.start()
  // if (getToken()) {
  if (true) {
    if (to.path === '/login') {
      next({ path: '/' })
      //NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        next()
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          console.log('get info permission')
          //next()
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            console.log('get info error')
            //Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      //NProgress.done()
    }
  }
})


/*
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
*/