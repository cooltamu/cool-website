import * as types from '@/store/mutation-types'
import api from '@/services/api/sessions'
import { buildSuccess, handleError } from '@/utils/utils.js'
// const moment = require('moment')

const getters = {
  session_data: (state) => state.session_data,
  total_session_data: (state) => state.total_session_data
}

const actions = {
  getAllSessions({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAllSessions(payload)
        .then((response) => {
          console.log(response)
          // console.log(response)
          // response.data.docs.forEach((doc) => {
          //   doc.start = moment(doc.start).format('YYYY-MM-DD HH:mm') // new Date(doc.start) // .toLocaleString("en-US")
          //   doc.end = moment(doc.end).format('YYYY-MM-DD HH:mm') // .toLocaleString("en-US")
          // }) TOTAL_SESSION_DATA

          if (response.status === 200) {
            commit(types.SESSION_DATA, response.data.docs)
            commit(types.TOTAL_SESSION_DATA, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  saveSession({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      const data = {
        reading: payload.reading,
        comprehension: payload.comprehension,
        retention: payload.retention,
        note: payload.note,
        mentor: payload.mentor,
        mentee: payload.mentee,
        event: payload.event
      }
      api
        .saveSession(data)
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
  saveEvent({ commit }, payload) {
    console.log('this is the payload')
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .saveEvent(payload)
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
  deleteSession({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteSession(payload)
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
  [types.SESSION_DATA](state, session_data) {
    state.session_data = session_data
  },
  [types.TOTAL_SESSION_DATA](state, total_session_data) {
    state.total_session_data = total_session_data
  }
}

const state = {
  session_data: [],
  total_session_data: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
