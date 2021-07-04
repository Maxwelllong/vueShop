import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css';


import {Input , Form, FormItem , Button , Row} from 'element-ui';



Vue.use( Form,FormItem)
Vue.use( Input)
Vue.use( Button)
Vue.use(Row)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
