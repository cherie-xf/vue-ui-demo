import { getToken, setToken, removeToken } from '@/utils/auth'
import { login_post,userinfo_get } from '@/api/demo'
const user = {
  state: {
    token: getToken(),
    name: 'admin',
    avatarid: 30,
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_AVATARID: (state, avatarid) => {
      state.avatarid = avatarid
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // login
    Login({ commit }, userInfo) {
      console.log('login', userInfo)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login_post({username: username, password:userInfo.password}).then(response => {
          const data = response.data.data
          var token = data.token.split('_')[1]
          console.log('get response', data)
          setToken(username + '_' +token)
          commit('SET_TOKEN', username + '_' +token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // get user info
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userinfo_get(state.token).then(response => {
          const data = response.data.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATARID', data.avatarid)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // logout
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
      })
    },

  }
}

export default user