import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import welcome from '../components/welcome.vue'
import User from '../components/user/user.vue'
import RightList from '../components/rightManage/Rightslist.vue'
import RoleList from '../components/rightManage/Rolelist.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/goodsList.vue'
import addgoods from '../components/goods/addgoods.vue'
import Report from '../components/report/report.vue'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
      {path:'/home',redirect:'/welcome',},
      {path:'/welcome',name:'welcomepage',component:welcome},
      {path:'/users',component:User},
      {path:'/rights',name:'rightlist',component:RightList},
      {path:'/roles' ,name:'roleList',component:RoleList},
      {path:'/categories' ,name:'categories',component:Cate},
      {path:'/params' ,name:'params',component:Params},
      {path:'/goods' ,name:'goodsList',component:GoodsList },
      {path:'/goods/addgoods' ,name:'addgoods',component:addgoods },
      {path:'/reports' ,name:'report',component:Report }
    ]},
    
  {path:'/login',name:'login',component:Login}
  
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
    nprogress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })
  axios.interceptors.response.use(config =>{
    nprogress.done()
    return config
  })
  if(!tokenStr) return next('/login')
  next()
})

export default router
