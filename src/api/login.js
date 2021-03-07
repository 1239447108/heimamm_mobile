import request from '@/utils/request'

export const sendCodeApi = data => {
  return request({
    url: '/au/code',
    method: 'POST',
    data,
    needToken: false
  })
}

export const loginApi = data => {
  return request({
    url: '/au/login',
    method: 'POST',
    data,
    needToken: false
  })
}
