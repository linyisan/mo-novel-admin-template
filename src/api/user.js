import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// get方法自动拼接query
export function searchUser(query) {
  return request({
    url: '/user/search',
    method: 'get',
    params: query
  })
}

export function getUser(id) {
  return request({
    url: `/user/get/${id}`,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'get'
  })
}
