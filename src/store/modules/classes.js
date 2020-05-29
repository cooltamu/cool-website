/* eslint-disable no-shadow */
import * as types from '@/store/mutation-types'
import api from '@/services/api/classes'
import { buildSuccess, handleError } from '@/utils/utils.js'
const state = {
  classes: []
}

// const mutations = {
//   increment: (state) => state.count++,
//   decrement: (state) => state.count--
// }
const mutations = {
  [types.CLASSES](state, events) {
    state.classes = events
  }
  // [types.TOTAL_EVENTS](state, value) {
  //   state.totalEvents = value
  // }
}

const getters = {
  getClassById: (state) => (id) => {
    return state.classes.find((item) => item._id === id)
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