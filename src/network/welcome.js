import { request }  from "./request"

export function getPlateDate() {
  return request({
    url:'api/welcomePlateMsg'
  })
}