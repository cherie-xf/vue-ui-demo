// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import Vuetify from 'vuetify'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

import 'iview/dist/styles/iview.css';// index.js or main.js
import 'vuetify/dist/vuetify.min.css' 
import '@/styles/index.less' // global css
import '@/icons' // icon

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(Vuetify);
Vue.use(ECharts);
Vue.component('chart', ECharts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
