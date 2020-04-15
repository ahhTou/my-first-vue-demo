import { request } from './request'

export function checkUsername(username) {
  return request({
    url: 'api/accountCheckUsername',
    method: 'post',
    data: { username }
  })
}
export function checkEmail(email) {
  return request({
    url: 'api/accountCheckEmail',
    method: 'post',
    data: { email }
  })
}
export function registerAccount(account) {
  return request({
    url: 'api/registerAccount',
    method: 'post',
    data: { account }
  })
}
export function loginAccount(account) {
  return request({
    url: 'api/loginAccount',
    method: 'post',
    data: { account }
  })
}
export function getAccountBaseMsg() {
  return request({
    url: 'api/getAccountBaseMsg',
    method: 'post'
  })
}
export function setAccountBaseMsg(msg) {
  return request({
    url: 'api/setAccountBaseMsg',
    method: 'post',
    data: { msg }
  })
}
