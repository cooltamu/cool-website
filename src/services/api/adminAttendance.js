import axios from 'axios'

export default {
  addAttendance(eventId, payload) {
    return axios.post(`/events/${eventId}/attendance`, payload)
  },
  delAttendance(eventId, payload) {
    console.log(payload, 'this')
    return axios.delete(`/events/${eventId}/attendance`, { data: payload })
  }
}
