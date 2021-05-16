import request from '@/utils/request'

export function getNotice(id) {
  return request({
    url: `/notice/get/${id}`,
    method: 'get'
  })
}

export function searchNotice(query) {
  return request({
    url: '/notice/search',
    method: 'get',
    params: query
  })
}

export function addNotice(data) {
  return request({
    url: '/notice/add',
    method: 'post',
    data: data
  })
}

export function editNotice(data) {
  return request({
    url: '/notice/edit',
    method: 'post',
    data: data
  })
}

export function deleteNotice(id) {
  return request({
    url: `/notice/delete/${id}`,
    method: 'get'
  })
}

