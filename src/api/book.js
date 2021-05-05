import request from '@/utils/request'

export function getAllBook(query) {
  return request({
    url: 'http://localhost:8089/book/list',
    method: 'get',
    params: query
  })
}

export function getBook(id) {
  return request({
    url: `http://localhost:8089/book/get/${id}`,
    method: 'get',
    params: { id }
  })
}

export function searchBook(query) {
  return request({
    url: 'http://localhost:8089/book/search',
    method: 'get',
    params: query
  })
}

export function addBook(data) {
  return request({
    url: 'http://localhost:8089/book/add',
    method: 'post',
    data: data
  })
}

export function editBook(data) {
  return request({
    url: 'http://localhost:8089/book/edit',
    method: 'post',
    data: data
  })
}

export function deleteBook(id) {
  return request({
    url: `http://localhost:8089/book/delete/${id}`,
    method: 'get'
  })
}

