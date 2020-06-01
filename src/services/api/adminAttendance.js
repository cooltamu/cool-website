import axios from 'axios'

export default {
  addAttendance(eventId, payload) {
    return axios.post(`/events/${eventId}/attendance`, payload)
  },
  delAttendance(eventId, payload) {
    return axios.delete(`/events/${eventId}/attendance`, { data: payload })
  },
  getAttendance(eventId, payload) {
    return axios.get(`/events/${eventId}/attendance`, payload)
  },
  getAttendanceInfo(eventId, payload) {
    return axios.get(`/events/${eventId}/attendance/info`, payload)
  }
}
