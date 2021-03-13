import { request } from '@/plugins/request'


export const login = data => {
  return request({
    method: 'POST',
    url: 'api/users/login',
    data
  })
}

// zhanghao 13579@163.com 13579qwer
export const register = data => {
  return request({
    method: 'POST',
    url: 'api/users',
    data
  })
}