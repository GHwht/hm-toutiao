// 封装一个vue的插件 完成当前文件夹下所有组件的全局注册
// 当导入这个模块 使用Vue.use(使用这个模块) Vue会调用install函数 默认传入Vue对象

import MyBread from '@/components/my-bread.vue'

export default {
  install (Vue) {
    // 使用Vue对象去做你的业务即可
    // 进行组件的注册
    // Vue.component('aaa', MyBread)
    Vue.component(MyBread.name, MyBread)

    // 多个注册注册 就重复写多个就ok了
  }
}
