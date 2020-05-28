/* eslint-disable no-shadow */
import * as types from '@/store/mutation-types'
import api from '@/services/api/classes'
import { handleError } from '@/utils/utils.js'

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
  decrement: ({ commit }) => {
    commit('decrement')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
