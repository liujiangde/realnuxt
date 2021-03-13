/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'

const request = axios.create({
  // baseURL: 'https://conduit.productionready.io'
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 请求拦截器
// 任何请求都要经过请求拦截器
// 可以做一些公共业务处理 例如统一设置token
request.interceptors.request.use(function (config) {
  // console.log(123);
  config.headers.Authorization = `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTk2MWY4ZTAwYjI1MjhiMmJmZDcwMSIsInVzZXJuYW1lIjoicXdlciIsImV4cCI6MTYxOTQyNTc5MywiaWF0IjoxNjE0MjQxNzkzfQ.2hUWW29D6PolAJt5Y88MgTrWBxhPsuvGUhnZCd2ZpUE`

  return config;
}, function (error) {
  // 如果请求失败 （此时请求没发出去） 就会进去这里
  return Promise.reject(error);
})


export default request