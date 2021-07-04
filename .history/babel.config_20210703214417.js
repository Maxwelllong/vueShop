import Vue from 'vue';
import { Cascader } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';

Vue.component(Cascader.name, Cascader)
// Vue.use(Cascader)

new Vue({
  el: '#app',
  render: h => h(App)
});