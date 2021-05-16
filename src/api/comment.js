import request from '@/utils/request'

export function getBookComment(id) {
  return request({
    url: `/bookcomment/get/${id}`,
    method: 'get'
  })
}

export function searchBookComment(query) {
  return request({
    url: '/bookcomment/search',
    method: 'get',
    params: query
  })
}

export function getAllBookComment(bookId) {
  return request({
    url: `/bookcomment/getAll/${bookId}`,
    method: 'get'
  })
}

export function addBookComment(data) {
  return request({
    url: '/bookcomment/add',
    method: 'post',
    data: data
  })
}

export function editBookComment(data) {
  return request({
    url: '/bookcomment/edit',
    method: 'post',
    data: data
  })
}

export function deleteBookComment(id) {
  return request({
    url: `/bookcomment/delete/${id}`,
    method: 'get'
  })
}

