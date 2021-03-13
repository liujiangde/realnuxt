import { request } from '@/plugins/request'

export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/api/profile',
    params
  })
},
