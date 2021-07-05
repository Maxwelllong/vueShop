import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import user from './comments/user/user'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/users',
        component:user
      }
    ]
  },{
    path:'/login',
    name:'login',
    component:Login
  }
  
]

const router = new VueRouter({
  routes
})

//设置路由导航守卫
router.beforeEach((to, from, next) => {
  // to要去的页面 from从哪里来 next放行 
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  axios.interceptors.request.use(config =>{
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })
  if(!tokenStr) return next('/login')
  next()
})

export default router
