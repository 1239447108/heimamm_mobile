import request from '@/utils/request'

export const getQuestionFiltersApi = () => {
  return request({
    url: '/interview/filters',
    needToken: false
  })
}

export const submitQuestionApi = data => {
  return request({
    url: '/questions/submit',
    method: 'POST',
    data,
    needToken: true
  })
}

export const getQuestionDetailApi = id => {
  return request({
    url: '/questions/' + id,
    needToken: true
  })
}
