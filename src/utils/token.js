import {setCookie} from '@/utils/cookie'

const TokenKey = 'OPENAUTHUSERTOKEN'

var token = 'Token'
export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(token)
}

export function setToken(token) {
  return setCookie(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.getItem(token)
}
