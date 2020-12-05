import * as types from '@/store/mutation-types'
import api from '@/services/api/adminLibrary'
import { buildSuccess, handleError } from '@/utils/utils.js'
// const moment = require('moment')

const getters = {
  libraries: (state) => state.libraries,
  totalLibraries: (state) => state.totalLibraries
}

const actions = {
  getLibraries({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getLibraries(payload)
        .then((response) => {
          console.log(response)
          // response.data.docs.forEach((doc) => {
          //   doc.start = moment(doc.start).format('YYYY-MM-DD HH:mm') // new Date(doc.start) // .toLocaleString("en-US")
          //   doc.end = moment(doc.end).format('YYYY-MM-DD HH:mm') // .toLocaleString("en-US")
          // })

          if (response.status === 200) {
            commit(types.LIBRARIES, response.data.docs)
            commit(types.TOTAL_LIBRARIES, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editLibrary({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name,
        info: payload.info,
        location: payload.location
      }
      api
        .editLibrary(payload._id, data)
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
  saveLibrary({ commit }, payload) {
    console.log('this is the payload')
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .saveLibrary(payload)
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
  deleteLibrary({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteLibrary(payload)
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
  [types.LIBRARIES](state, libraries) {
    state.libraries = libraries
  },
  [types.TOTAL_LIBRARIES](state, value) {
    state.totalLibraries = value
  }
}

const state = {
  libraries: [],
  totalLibraries: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
