import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import  './assets/fonts/iconfont.css'
import treeTable from 'vue-table-with-tree-grid'

import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
import getTimer from './components/dateFormat.js'

import axios from 'axios'
// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.use(axios)
Vue.component('tree-table',treeTable)
Vue.use(element)
Vue.user(getTimer)

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
