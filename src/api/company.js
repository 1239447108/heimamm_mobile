import request from '@/utils/request'

export const getCompanyListApi = data => {
  return request({
    url: '/companies/list',
    params: data,
    needToken: false
  })
}

export const getCompanyDetailByIdApi = data => {
  return request({
    url: '/companies/' + data,
    needToken: false
  })
}

export const getCompanyCommentByIdApi = (id, params) => {
  return request({
    url: `/companies/${id}/comments`,
    params,
    needToken: false
  })
}
