
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user list
  {
    url: '/vue-admin-template/user/list',
    type: 'get',
    response: _ => {
      return {
        'code': 20000,
        'msg': 'success',
        'data': {
          'total': 2,
          'items': [
            {
              'id': 5,
              'createTime': '2021-05-03 02:49:35',
              'updateTime': '2021-05-03 02:49:35',
              'username': 'admin',
              'password': 'admin',
              'sex': 0,
              'email': 'admin@qq.com',
              'mobile': '13286181871',
              'status': 1,
              'roleId': 1
            },
            {
              'id': 6,
              'createTime': '2021-05-03 02:49:39',
              'updateTime': '2021-05-03 02:49:39',
              'username': 'zhangsan',
              'password': 'zhangsan',
              'sex': 1,
              'email': 'zhangsan@qq.com',
              'mobile': '13286181879',
              'status': 1,
              'roleId': 1
            }
          ]
        }
      }
    }
  }
]
