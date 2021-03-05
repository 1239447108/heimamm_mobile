import request from '@/utils/request'

export const getUserInfo = () => {
  return request({
    url: '/au/info'
  })
}

export const uploadAvatar = data => {
  return request({
    url: '/upload',
    data,
    method: 'POST'
  })
}

export const editUserInfo = data => {
  return request({
    url: '/au/edit',
    method: 'POST',
    data
  })
}
