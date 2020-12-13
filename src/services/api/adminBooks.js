import axios from 'axios'

export default {
  getBooks(params) {
    return axios.get('/library/book', {
      params
    })
  },
  editBook(id, payload) {
    return axios.patch(`/library/book/${id}`, payload)
  },
  saveBook(payload) {
    return axios.post('/library/book', payload)
  },
  deleteBook(id) {
    return axios.delete(`/library/book/${id}`)
  }
}
