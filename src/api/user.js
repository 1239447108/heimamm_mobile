import request from '@/utils/request'

export const getUserInfoApi = () => {
  return request({
    url: '/au/info',
    needToken: true
  })
}

export const uploadAvatarApi = data => {
  return request({
    url: '/upload',
    data,
    method: 'POST',
    needToken: true
  })
}

export const editUserInfoApi = data => {
  return request({
    url: '/au/edit',
    method: 'POST',
    data,
    needToken: true
  })
}
