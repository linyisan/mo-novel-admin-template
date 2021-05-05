import request from '@/utils/request'

export function getBookIndex(id) {
  return request({
    url: `http://localhost:8089/bookindex/get/${id}`,
    method: 'get'
  })
}

export function searchBookIndex(query) {
  return request({
    url: 'http://localhost:8089/bookindex/search',
    method: 'get',
    params: query
  })
}

export function addBookIndex(data) {
  return request({
    url: 'http://localhost:8089/bookindex/add',
    method: 'post',
    data: data
  })
}

export function editBookIndex(data) {
  return request({
    url: 'http://localhost:8089/bookindex/edit',
    method: 'post',
    data: data
  })
}

export function deleteBookIndex(id) {
  return request({
    url: `http://localhost:8089/bookindex/delete/${id}`,
    method: 'get'
  })
}

