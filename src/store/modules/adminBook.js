import * as types from '@/store/mutation-types'
import api from '@/services/api/adminBooks'
import { buildSuccess, handleError } from '@/utils/utils.js'
// const moment = require('moment')

const getters = {
  books: (state) => state.books,
  totalBooks: (state) => state.totalBooks
}

const actions = {
  getBooks({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getBooks(payload)
        .then((response) => {
          console.log(response)
          // response.data.docs.forEach((doc) => {
          //   doc.start = moment(doc.start).format('YYYY-MM-DD HH:mm') // new Date(doc.start) // .toLocaleString("en-US")
          //   doc.end = moment(doc.end).format('YYYY-MM-DD HH:mm') // .toLocaleString("en-US")
          // })

          if (response.status === 200) {
            commit(types.BOOKS, response.data.docs)
            commit(types.TOTAL_BOOKS, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editBook({ commit }, payload) {
    console.log('payload', payload)
    return new Promise((resolve, reject) => {
      const data = {
        title: payload.title,
        isbn: payload.isbn,
        notes: payload.notes
      }
      if (payload.donor) {
        data.donor = payload.donor
      }
      if (payload.history && payload.history.length > 0) {
        data.history = payload.history
      }
      api
        .editBook(payload._id, data)
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
  saveBook({ commit }, payload) {
    console.log('this is the payload')
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .saveBook(payload)
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
  deleteBook({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteBook(payload)
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
  [types.BOOKS](state, books) {
    state.books = books
  },
  [types.TOTAL_BOOKS](state, value) {
    state.totalBooks = value
  }
}

const state = {
  books: [],
  totalBooks: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
