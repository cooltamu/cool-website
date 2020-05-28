import axios from 'axios'

export default {
  getAllClasses(params) {
    return axios.get('/classes', {
      params
    })
  },
  getClasses(params) {
    return axios.get('/classes', {
      params
    })
  },
  editClass(id, payload) {
    return axios.patch(`/classes/${id}`, payload)
  },
  saveClass(payload) {
    return axios.post('/classes/', payload)
  },
  deleteClass(id) {
    return axios.delete(`/classes/${id}`)
  }
}
