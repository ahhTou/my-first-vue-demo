import { request }  from "./request"

export function checkUsername(username) {
  return request({
    url:'api/accountCheckUsername',
    method:'post',
    query:{ username },
    data:{ username }
  })
}
export function checkEmail(email) {
  return request({
    url:'api/accountCheckEmail',
    method:'post',
    query:{ email },
    data:{ email }
  })
}
export function registerAccount(account) {
  return request({
    url:'api/registerAccount',
    method:'post',
    query:{ account },
    data:{ account }
  })
}
export function loginAccount(account) {
  return request({
    url:'api/loginAccount',
    method:'post',
    query:{ account },
    data:{ account },
  })
}
export function getAccountBaseMsg(token){
  return request({
    url:'api/getAccountBaseMsg',
    method:'post',
    query:{ token },
    data:{ token },
  })
}
export function setAccountBaseMsg(msg){
  return request({
    url:'api/setAccountBaseMsg',
    method:'post',
    query:{ msg },
    data:{ msg },
  })
}