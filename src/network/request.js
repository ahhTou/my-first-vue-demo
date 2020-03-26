import axios from 'axios'

export function request(config){
  const instance = axios.create({
    // baseURL:'http://127.0.0.1:3000/',
    timeout:500
  })
  return instance(config);
}