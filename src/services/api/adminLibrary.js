import axios from 'axios'

export default {
  getLibraries(params) {
    return axios.get('/library', {
      params
    })
  },
  editLibrary(id, payload) {
    return axios.patch(`/library/${id}`, payload)
  },
  saveLibrary(payload) {
    return axios.post('/library/', payload)
  },
  deleteLibrary(id) {
    return axios.delete(`/library/${id}`)
  }
}
