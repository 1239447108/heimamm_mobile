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

export const getCompanyPositionByIdApi = (id, params) => {
  return request({
    url: `/companies/${id}/positions`,
    params,
    needToken: false
  })
}

export const addCompanyCommentApi = data => {
  return request({
    url: '/comments',
    method: 'POST',
    data,
    needToken: true
  })
}

export const getPositionDetailByIdApi = id => {
  return request({
    url: '/positions/' + id,
    needToken: false
  })
}

export const getCompanyFiltersApi = id => {
  return request({
    url: '/questions/companyFilters/' + id,
    needToken: true
  })
}

export const getCompanyQuestionApi = (id, params) => {
  return request({
    url: '/questions/company/' + id,
    params,
    needToken: true
  })
}
