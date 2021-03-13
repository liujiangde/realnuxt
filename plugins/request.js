/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'

export const request = axios.create({
  // baseURL: 'https://conduit.productionready.io'
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 通过插件机制获取到上下文对象 query params req res app store
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  // 任何请求都要经过请求拦截器
  // 可以做一些公共业务处理 例如统一设置token
  request.interceptors.request.use(function (config) {
    const { user } = store.state

    if (user && user.token) {
      config.headers.Authorization = `Token ${store.state.user.token} `
    }
    return config;
  }, function (error) {
    // 如果请求失败 （此时请求没发出去） 就会进去这里
    return Promise.reject(error);
  })
}



// export default request