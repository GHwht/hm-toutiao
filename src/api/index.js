import axios from 'axios'
import JSONBig from 'json-bigint'

//  实例化axios
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    // 判断数据是否存在
    if (data) {
      // 对数据进行任意转换处理
      return JSONBig.parse(data)
    }
    return data
  }]
})

// 设置请求拦截器 在向后台发送请求前 在头部添加token值
instance.interceptors.request.use((config) => {
  // 获取登录信息
  const user = window.sessionStorage.getItem('hm-toutiao')
  // 判断登录信息是否存在
  if (user) {
    //   如果登录信息存在 则在头部添加token验证信息
    config.headers = {
      // !!!!!!!!!!一定要加空格!!!!!!!!!
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
})

// 设置响应拦截器 实现 如果token失效 则跳转回登录页功能
instance.interceptors.response.use((res) => {
  return res
}, (error) => {
  // 获取状态码
  const status = error.response.status
  // 判断状态码是否是401 并且 后台有响应
  if (error.response && status === 401) {
    //   如果是401 则跳转回登录页
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

// 导出axios的实例化对象
export default instance
