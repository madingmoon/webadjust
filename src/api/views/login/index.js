import configs from '@/api/config' //configs
import request from '@/utils/request'
import { getToken } from '@/utils/token' // 验权

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}