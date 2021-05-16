import request from '@/utils/request'

export function getAllBook(query) {
  return request({
    url: '/book/list',
    method: 'get',
    params: query
  })
}

export function getBook(id) {
  return request({
    url: `/book/get/${id}`,
    method: 'get',
    params: { id }
  })
}

export function searchBook(query) {
  return request({
    url: '/book/search',
    method: 'get',
    params: query
  })
}

export function addBook(data) {
  return request({
    url: '/book/add',
    method: 'post',
    data: data
  })
}

export function editBook(data) {
  return request({
    url: '/book/edit',
    method: 'post',
    data: data
  })
}

export function deleteBook(id) {
  return request({
    url: `/book/delete/${id}`,
    method: 'get'
  })
}

