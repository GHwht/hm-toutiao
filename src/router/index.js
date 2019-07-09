// 导入需要的组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
// import Login from '../views/login/index'
// 注册
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login }
  ]
})

export default router
