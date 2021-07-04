import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';

import { Form, FormItem } from 'element-ui';
Vue.component(Form, FormItem)
// Vue.use(Cascader)

new Vue({
  el: '#app',
  render: h => h(App)
});