import request from '@/utils/request'

export const getHotDataApi = () => {
  return request({
    url: '/chart-data/hot',
    needToken: false
  })
}

export const getDataIndexApi = () => {
  return request({
    url: '/chart-data/indexes',
    needToken: false
  })
}

export const getChartDataApi = params => {
  return request({
    url: '/chart-data/statistics',
    params,
    needToken: false
  })
}
