/* eslint-disable no-shadow */
import * as types from '@/store/mutation-types'
import api from '@/services/api/classes'
import { buildSuccess, handleError } from '@/utils/utils.js'
const state = {
  classes: [],
  activeClass: {}
}

// const mutations = {
//   increment: (state) => state.count++,
//   decrement: (state) => state.count--
// }
const mutations = {
  [types.CLASSES](state, classes) {
    state.classes = classes
  },
  [types.ACTIVE_CLASS](state, _class) {
    state.activeClass = _class
  }
  // [types.TOTAL_EVENTS](state, value) {
  //   state.totalEvents = value
  // }
}

const getters = {
  getClassById: (state) => (id) => {
    return state.classes.find((item) => item._id === id)
  },
  getActiveClass: (state) => () => {
    return state.activeClass
  }
}

const actions = {
  getAllClasses({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAllClasses()
        .then((response) => {
          if (response.status === 200) {
            commit(types.CLASSES, response.data.docs)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  getClass({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .getClass(payload._id, payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.ACTIVE_CLASS, response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editClass({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      api
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
      api
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
      api
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
