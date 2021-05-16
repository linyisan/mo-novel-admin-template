import request from '@/utils/request'
// 数据统计

export function countSta() {
  return request({
    url: '/stat/countSta',
    method: 'get'
  })
}
