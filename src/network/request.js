import axios from 'axios'

export function request(config) {
  var path = window.document.location.origin;
  const instance = axios.create({
    baseURL: path,
  })
  instance.interceptors.request.use(
    config => {
      if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });
  return instance(config);
}