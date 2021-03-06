import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },{
    path:'/login',
    name:'login',
    component:Login
  }
  
]

const router = new VueRouter({
  routes
})

export default router
