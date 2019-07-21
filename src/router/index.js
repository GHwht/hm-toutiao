// 导入需要的组件
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/index.vue'
import Home from '../views/home'
import Welcome from '../views/welcome'
import Notfound from '../views/404/404.vue'
import Article from '../views/article'
import Image from '../views/image'
import Publish from '../views/publish'
import Comment from '../views/comment'
import Setting from '../views/setting'
import Fans from '../views/fans'

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment },
        { name: 'setting', path: '/setting', component: Setting },
        { name: 'fans', path: '/fans', component: Fans }
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

Vue.use(VueRouter)

export default router
