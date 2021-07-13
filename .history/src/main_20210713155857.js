import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import  './assets/fonts/iconfont.css'
import treeTable from 'vue-table-with-tree-grid'

import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

import axios from 'axios'
// 配置请求的基准URL地址 
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.use(axios)
Vue.component('tree-table',treeTable)
Vue.use(element)

Vue.prototype.$http = axios
Vue.config.productionTip = false

//{{ date | dateFormat('yyyy-mm-dd') }} 不填默认 yyyy-mm-dd hh-mm-ss
// 过滤器， 进行时间的格式化
Vue.filter('dateFormat', function (dateStr, pattern = '') {
  let dt = new Date(dateStr)
  let y = dt.getFullYear()
  let m = (dt.getMonth() + 1).toString().padStart(2, '0')
  let d = dt.getDate().toString().padStart(2, '0')
  pattern.toLowerCase() //传入参数转成小写
  if (pattern.toLowerCase() === 'yyyy-mm-dd') {
    return `${y}-${m}-${d}`
  } else {
    let hh = dt.getHours().toString().padStart(2, '0')
    let mm = dt.getMinutes().toString().padStart(2, '0')
    let ss = dt.getSeconds().toString().padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
})

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

// 引入lodash工具箱
import _ from 'lodash'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

