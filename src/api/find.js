import request from '@/utils/request'

export const getTechnicListApi = data => {
  return request({
    url: '/articles/technic',
    params: data,
    needToken: false
  })
}

export const getTechnicDetailApi = data => {
  return request({
    url: '/articles/technic/' + data,
    needToken: false
  })
}

export const getShareListApi = data => {
  return request({
    url: '/articles/share',
    params: data,
    needToken: false
  })
}

export const getShareDetailApi = data => {
  return request({
    url: '/articles/share/' + data,
    needToken: false
  })
}

export const getHotDataApi = () => {
  return request({
    url: '/chart-data/hot',
    needToken: false
  })
}

export const starArticleByIdApi = data => {
  return request({
    url: '/articles/star',
    method: 'POST',
    data,
    needToken: true
  })
}

export const getTechnicTopApi = () => {
  return request({
    url: '/articles/technicTopSearch',
    needToken: false
  })
}

export const getShareTopApi = () => {
  return request({
    url: '/articles/shareTopSearch',
    needToken: false
  })
}

export const getSearchHistoryApi = data => {
  return request({
    url: '/articles/mergeHistory',
    method: 'POST',
    data,
    needToken: true
  })
}

export const getShareCommentApi = data => {
  return request({
    url: '/articles/comments/' + data,
    needToken: false
  })
}

export const starCommentByIdApi = data => {
  return request({
    url: '/article-comments/star',
    method: 'POST',
    data,
    needToken: true
  })
}
