import * as types from '@/store/mutation-types'
import api from '@/services/api/adminUsers'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  users: (state) => state.users,
  totalUsers: (state) => state.totalUsers
}

const actions = {
  getUsers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getUsers(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.USERS, response.data.docs)
            commit(types.TOTAL_USERS, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name !== undefined ? payload.name : '',
        username: payload.username !== undefined ? payload.username : '',
        email: payload.email !== undefined ? payload.email : '',
        role: payload.role !== undefined ? payload.role : '',
        phone: payload.phone !== undefined ? payload.phone : '',
        card: payload.card !== undefined ? payload.card : '',
        uin: payload.uin !== undefined ? payload.uin : '',
        info: payload.info !== undefined ? payload.info : '',
        status: payload.status !== undefined ? payload.status : ''
      }
      api
        .editUser(payload._id, data)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  saveUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveUser(payload)
        .then((response) => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  deleteUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteUser(payload)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.DELETED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.USERS](state, users) {
    state.users = users
  },
  [types.TOTAL_USERS](state, value) {
    state.totalUsers = value
  }
}

const state = {
  users: [],
  totalUsers: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
