import request from '@/utils/request'

export function getAllBookSetting() {
  return request({
    url: '/booksetting/getAll',
    method: 'get'
  })
}


export function getBookSetting(id) {
  return request({
    url: `/booksetting/get/${id}`,
    method: 'get'
  })
}

export function searchBookSetting(query) {
  return request({
    url: '/booksetting/search',
    method: 'get',
    params: query
  })
}

export function addBookSetting(data) {
  return request({
    url: '/booksetting/add',
    method: 'post',
    data: data
  })
}

export function editBookSetting(data) {
  return request({
    url: '/booksetting/edit',
    method: 'post',
    data: data
  })
}

export function deleteBookSetting(id) {
  return request({
    url: `/booksetting/delete/${id}`,
    method: 'get'
  })
}
