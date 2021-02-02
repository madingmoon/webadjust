import configs from '@/api/config' //configs
import request from '@/utils/request'
import { getToken } from '@/utils/token' // 验权

//获取token
var BASE_URL = configs.BASE_URL
var token = configs.token

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}