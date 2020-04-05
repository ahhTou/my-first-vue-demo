import { request }  from "./request"

export function getUserHatchData() {
  return request({
    url:'api/common/getUserHatchData'
  })
}