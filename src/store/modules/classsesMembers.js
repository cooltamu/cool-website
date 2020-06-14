/* eslint-disable no-shadow */
import * as types from '@/store/mutation-types'
import classApi from '@/services/api/classes'
import usersApi from '@/services/api/adminUsers'
import {
  buildSuccess,
  handleError,
  buildPayloadPagination
} from '@/utils/utils.js'

const state = {
  classMembers: [],
  allTeachers: [],
  allTeachersCount: 0
}

const mutations = {
  [types.ALL_CLASS_TEACHERS](state, members) {
    state.allTeachers = members
  },
  [types.ALL_CLASS_TEACHERS_COUNT](state, count) {
    state.allTeachersCount = count
  }
}

const getters = {
  getAllTeachers: (state) => () => {
    return state.allTeachers
  },
  getAllTeachersCount: (state) => () => {
    return state.allTeachersCount
  },
  getActiveClass: (state) => () => {
    return state.activeClass
  }
}

const actions = {
  getAllTeachers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const { search, pagination } = payload
      usersApi
        .getUsers(
          buildPayloadPagination(pagination, {
            query: [search, 'teacher'].join(','),
            fields: ['name', 'role'].join(',')
          })
        )
        .then((response) => {
          if (response.status === 200) {
            commit(types.ALL_CLASS_TEACHERS, response.data.docs)
            commit(types.ALL_CLASS_TEACHERS_COUNT, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          console.log(error)
          handleError(error, commit, reject)
        })
    })
  },
  addTeacher({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { userId, classId } = payload
      classApi
        .createClassTeacher(classId, { id: userId })
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  editClass({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      classApi
        .editClass(payload._id, payload)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getAllClasses')
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
  createClass({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      classApi
        .createClass(payload)
        .then((response) => {
          if (response.status === 201) {
            dispatch('getAllClasses')
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
  deleteClass({ commit, dispatch }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      classApi
        .deleteClass(payload)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getAllClasses')
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

export default {
  state,
  mutations,
  actions,
  getters
}
