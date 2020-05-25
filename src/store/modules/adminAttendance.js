import * as types from '@/store/mutation-types'
import api from '@/services/api/adminAttendance'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  attendance: (state) => state.attendance,
  totalAttendance: (state) => state.totalAttendance
}

const actions = {
  addAttendance({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .addAttendance(payload._id, payload)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('comes here')

            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  delAttendance({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .delAttendance(payload._id, payload)
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log('comes here')

            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.ATTENDANCE](state, attendance) {
    state.attendance = attendance
  },
  [types.TOTAL_ATTENDANCE](state, value) {
    state.totalAttendance = value
  }
}

const state = {
  attendance: [],
  totalAttendance: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
