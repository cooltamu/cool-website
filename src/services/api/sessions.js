import axios from 'axios'

export default {
  getAllSessions(params) {
    return axios.get('/session/all/', {
      params
    })
  },
  getAvailableSessions(payload) {
    return axios.get(`/session/`, payload)
  },
  saveSession(payload) {
    return axios.post('/session/', payload)
  },
  deleteSession(payload) {
    return axios.delete(`/session/`, { data: payload })
  }
}
