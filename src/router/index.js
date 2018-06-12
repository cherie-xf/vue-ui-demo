import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    //hidden: true,
    name:'',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'home-o', wicon: 'home-w' }
      },
    ]
  },
  {
    path: '/threat',
    component: Layout,
    redirect: '/threat/top_threat',
    name: 'threat',
    meta: { title: 'Threat', icon: 'user-r-o' },
    children: [
      {
        path: 'top_threat',
        name: 'top_threat',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Threat', icon: 'sign' }
      },
      {
        path: 'threat_map',
        name: 'threat_map',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Threat Map', icon: 'international-o' }
      },
      {
        path: 'ioc',
        name: 'ioc',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Compromised Host', icon: 'courier-o' }
      },
      {
        path: 'sandbox',
        name: 'sandbox',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'FortiSandbox', icon: 'box-o' }
      },
    ]
  },
  {
    path: '/traffic',
    component: Layout,
    redirect: '/traffic/sources',
    name: 'traffic',
    meta: { title: 'Traffic', icon: 'exchange-o' },
    children: [
      {
        path: 'top_sources',
        name: 'top_sources',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Sources', icon: 'air-o' }
      },
      {
        path: 'top_destination',
        name: 'top_destination',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Destination', icon: 'air-drop-o' }
      },
      {
        path: 'top_countries',
        name: 'top_countries',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Countries', icon: 'map-2-o' }
      },
      {
        path: 'policy_hits',
        name: 'policy_hits',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Policy Hits', icon: 'rule-o' }
      },
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/top_application',
    name: 'app',
    meta: { title: 'Applications & Websites', icon: 'app-o' },
    children: [
      {
        path: 'top_application',
        name: 'top_application',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Application', icon: 'view-matrix-o' }
      },
      {
        path: 'top_cloud_application',
        name: 'top_cloud_application',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Cloud Application', icon: 'wave-o' }
      },
      {
        path: 'top_web_sites',
        name: 'top_web_sites',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Web Sites', icon: 'map-1-o' }
      },
      {
        path: 'top_browsing_users',
        name: 'top_browsing_users',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Browsing Users', icon: 'group-o' }
      },
    ]
  },
  {
    path: '/vpn',
    component: Layout,
    redirect: '/vpn/top_ssl',
    name: 'vpn',
    meta: { title: 'VPN', icon: 'relationship-o' },
    children: [
      {
        path: 'top_ssl',
        name: 'top_ssl',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top SSL & dIALUP IPsec', icon: 'view-list-o' }
      },
      {
        path: 'top_site',
        name: 'top_site',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Top Site-to-Site IPsec', icon: 'volume-o' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
