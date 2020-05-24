import axios from 'axios'

export default {
  getEvents(params) {
    return axios.get('/events', {
      params
    })
  },
  editEvent(id, payload) {
    return axios.patch(`/events/${id}`, payload)
  },
  saveEvent(payload) {
    return axios.post('/events/', payload)
  },
  deleteEvent(id) {
    return axios.delete(`/events/${id}`)
  }
}
