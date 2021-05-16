import request from '@/utils/request'

export function getFeedback(id) {
  return request({
    url: `/feedback/get/${id}`,
    method: 'get'
  })
}

export function searchFeedback(query) {
  return request({
    url: '/feedback/search',
    method: 'get',
    params: query
  })
}

export function addFeedback(data) {
  return request({
    url: '/feedback/add',
    method: 'post',
    data: data
  })
}

export function editFeedback(data) {
  return request({
    url: '/feedback/edit',
    method: 'post',
    data: data
  })
}

export function deleteFeedback(id) {
  return request({
    url: `/feedback/delete/${id}`,
    method: 'get'
  })
}

