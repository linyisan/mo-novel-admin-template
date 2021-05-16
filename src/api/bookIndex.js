import request from '@/utils/request'

export function getBookIndex(id) {
  return request({
    url: `/bookindex/get/${id}`,
    method: 'get'
  })
}

export function searchBookIndex(query) {
  return request({
    url: '/bookindex/search',
    method: 'get',
    params: query
  })
}

export function addBookIndex(data) {
  return request({
    url: '/bookindex/add',
    method: 'post',
    data: data
  })
}

export function editBookIndex(data) {
  return request({
    url: '/bookindex/edit',
    method: 'post',
    data: data
  })
}

export function deleteBookIndex(id) {
  return request({
    url: `/bookindex/delete/${id}`,
    method: 'get'
  })
}

