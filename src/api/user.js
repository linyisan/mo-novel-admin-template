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

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/user/list',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: 'http://localhost:8089/user/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: 'http://localhost:8089/user/pv',
    method: 'get',
    params: { pv }
  })
}

export function createUser(data) {
  return request({
    url: 'http://localhost:8089/user/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: 'http://localhost:8089/user/update',
    method: 'post',
    data
  })
}
