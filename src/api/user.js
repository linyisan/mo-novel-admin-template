import request from '@/utils/request'

// TODO:修改URL
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/logout',
    method: 'post'
  })
}

// get方法自动拼接query
export function searchUser(query) {
  return request({
    url: 'http://localhost:8089/user/search',
    method: 'get',
    params: query
  })
}

export function getUser(id) {
  return request({
    url: `http://localhost:8089/user/get/${id}`,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: 'http://localhost:8089/user/add',
    method: 'post',
    data: data
  })
}

export function editUser(data) {
  return request({
    url: 'http://localhost:8089/user/edit',
    method: 'post',
    data: data
  })
}
export function deleteUser(id) {
  return request({
    url: `http://localhost:8089/user/delete/${id}`,
    method: 'get'
  })
}
