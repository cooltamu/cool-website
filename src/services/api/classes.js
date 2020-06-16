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
  getClass(id, payload) {
    return axios.get(`/classes/${id}`, payload)
  },
  createClass(payload) {
    return axios.post('/classes/', payload)
  },
  deleteClass(id) {
    return axios.delete(`/classes/${id}`)
  },
  getAllClassTeachers(classId, payload) {
    return axios.get(`/classes/${classId}/teachers/`, payload)
  },
  createClassTeacher(classId, payload) {
    return axios.post(`/classes/${classId}/teachers/`, payload)
  },
  deleteClassTeacher(classId, userId) {
    return axios.delete(`/classes/${classId}/teachers/${userId}`)
  },
  getAllClassMentees(classId, payload) {
    return axios.get(`/classes/${classId}/mentees/`, payload)
  },
  createClassMentee(classId, payload) {
    return axios.post(`/classes/${classId}/mentees/`, payload)
  },
  deleteClassMentee(classId, userId) {
    return axios.delete(`/classes/${classId}/mentees/${userId}`)
  },
  createClassMentorship(classId, payload) {
    return axios.post(`/classes/${classId}/mentorships/`, payload)
  },
  deleteClassMentorship(classId, userId) {
    return axios.delete(`/classes/${classId}/mentorships/${userId}`)
  }
}
