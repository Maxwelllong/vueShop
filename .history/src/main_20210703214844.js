import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {Form,Formitem} from 'element-ui'

Vue.use(
  ElementUI
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  elementUI,
  render: h => h(App)
}).$mount('#app')
