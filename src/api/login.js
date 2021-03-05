import request from '@/utils/request'

export const sendCode = data => {
  return request({
    url: '/au/code',
    method: 'POST',
    data
  })
}

export const login = data => {
  return request({
    url: '/au/login',
    method: 'POST',
    data
  })
}
