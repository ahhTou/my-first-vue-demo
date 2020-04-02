import axios from 'axios'

export function request(config){
  var path=window.document.location.origin;
  const instance = axios.create({
    baseURL: path,
  })
  return instance(config);
}