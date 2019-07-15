// 导入需要的组件
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/index.vue'
import Home from '../views/home'
import Welcome from '../views/welcome'
import Notfound from '../views/404/404.vue'
import Article from '../views/article'

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article }
      ]
    },
    { name: '404', path: '*', component: Notfound }
  ]
})

// 创建前置守卫, 实现 拦截未登录路由 的功能
router.beforeEach((to, from, next) => {
  // 判断跳转的是不是登录页 是的话正常跳转 并停止代码的执行
  if (to.path === '/login') return next()
  // 获取登录信息
  const user = window.sessionStorage.getItem('hm-toutiao')
  // 判断登录信息是否存在
  if (user) {
    // 有登录信息的话 正常跳转
    return next()
  }
  // 若以上的情况都不是 则返回到登录页
  next('/login')
})

// // 创建前置守卫 实现拦截未登录的功能
// router.beforeEach((to, from, next) => {
//   // 判断跳转的是不是登录页
//   if (to.path) { return next() }
//   // 获取登录信息
//   const use = window.sessionStorage.getItem('hm-toutiao')
// })

Vue.use(VueRouter)

export default router
