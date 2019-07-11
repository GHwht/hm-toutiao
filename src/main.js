// 职责1, 导入项目需要依赖的资源(包 css...)
// 职责2: 初始化根实例(new Vue() 选项 render 作用是把某一个App组件渲染到页面上)

import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ELEMENTUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入router
// 1 默认索引 文件夹下 存在 index.js index.vue index.json 默认加载这些文件
// import router from './router'
// 2. 在使用vue-cli的时候 @ 符号在路径中作为前缀使用的时候 代表src目录
import router from '@/router'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(ELEMENTUI)

// 全局自动获取焦点
Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
