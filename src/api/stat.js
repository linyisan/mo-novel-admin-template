import request from '@/utils/request'
// 数据统计
export function fanSta() {
  return request({
    url: '/stat/fanSta',
    method: 'get'
  })
}

export function countSta() {
  return request({
    url: '/stat/fanSta2',
    method: 'get'
  })
}
