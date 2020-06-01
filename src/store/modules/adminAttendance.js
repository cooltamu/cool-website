import * as types from '@/store/mutation-types'
import api from '@/services/api/adminAttendance'
import { buildSuccess, handleError } from '@/utils/utils.js'
// const state = {
//   attendance: []
// }
const getters = {
  attendance: (state) => state.attendance,
  totalAttendance: (state) => state.totalAttendance,
  attendanceInfo: (state) => state.attendanceInfo
}
/* eslint-disable */
const actions = {
  addAttendance({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .addAttendance(payload._id, payload)
        .then((response) => {
          if (response.status === 200) {
            this.swipedUserData = response
            buildSuccess(
              {
                msg: 'common.SWIPE_SUCCESS'
              },
              commit,
              resolve
            )
            return response
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
          this.swipedUserData = response
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.SWIPE_SUCCESS'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
          return false
        })
    })
  },
  getAttendance({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .getAttendance(payload._id, payload)
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            commit(types.TOTAL_ATTENDANCE, response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  getAttendanceInfo({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .getAttendanceInfo(payload._id, payload)
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            commit(types.ATTENDANCE_INFO, response.data)
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
  },
  [types.ATTENDANCE_INFO](state, value) {
    state.attendanceInfo = value
  }
}

const state = {
  attendance: [],
  totalAttendance: 0,
  attendanceInfo: {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
