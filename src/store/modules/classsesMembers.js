/* eslint-disable no-shadow */
import * as types from '@/store/mutation-types'
import classApi from '@/services/api/classes'
import usersApi from '@/services/api/adminUsers'
import {
  buildSuccess,
  handleError,
  buildPayloadPagination
} from '@/utils/utils.js'

const state = {
  classMembers: [],
  allTeachers: [],
  allTeachersCount: 0,
  allMentees: [],
  allMenteesCount: 0,
  allMentorships: [],
  allMentors: [],
  allMentorsCount: 0
}

const mutations = {
  [types.ALL_CLASS_TEACHERS](state, members) {
    state.allTeachers = members
  },
  [types.ALL_CLASS_TEACHERS_COUNT](state, count) {
    state.allTeachersCount = count
  },
  [types.ALL_CLASS_MENTEES](state, members) {
    state.allMentees = members
  },
  [types.ALL_CLASS_MENTEES_COUNT](state, count) {
    state.allMenteesCount = count
  },
  [types.ALL_CLASS_MENTORSHIPS](state, members) {
    state.allMentorships = members
  },
  [types.ALL_CLASS_MENTORS](state, members) {
    state.allMentors = members
  },
  [types.ALL_CLASS_MENTORS_COUNT](state, count) {
    state.allMentorsCount = count
  }
}

const getters = {
  allTeachers: (state) => () => {
    return state.allTeachers
  },
  allTeachersCount: (state) => () => {
    return state.allTeachersCount
  },
  allMentees: (state) => () => {
    return state.allMentees
  },
  allMenteesCount: (state) => () => {
    return state.allMenteesCount
  },
  allMentors: (state) => () => {
    return state.allMentors
  },
  allMentorsCount: (state) => () => {
    return state.allMentorsCount
  }
}

const actions = {
  getAllTeachers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      console.log({ payload })
      const { search, pagination } = payload
      usersApi
        .getUsers(
          buildPayloadPagination(pagination, {
            query: [search, 'teacher'].join(','),
            fields: ['name', 'role'].join(',')
          })
        )
        .then((response) => {
          if (response.status === 200) {
            commit(types.ALL_CLASS_TEACHERS, response.data.docs)
            commit(types.ALL_CLASS_TEACHERS_COUNT, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          console.log(error)
          handleError(error, commit, reject)
        })
    })
  },
  addTeacher({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { userId, classId } = payload
      classApi
        .createClassTeacher(classId, { id: userId })
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  removeTeacher({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { userId, classId } = payload
      classApi
        .deleteClassTeacher(classId, userId)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  },
  getAllMentees({ commit }, payload) {
    return new Promise((resolve, reject) => {
      console.log({ payload })
      const { search, pagination } = payload
      usersApi
        .getUsers(
          buildPayloadPagination(pagination, {
            query: [search, 'mentee'].join(','),
            fields: ['name', 'role'].join(',')
          })
        )
        .then((response) => {
          if (response.status === 200) {
            commit(types.ALL_CLASS_MENTEES, response.data.docs)
            commit(types.ALL_CLASS_MENTEES_COUNT, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          console.log(error)
          handleError(error, commit, reject)
        })
    })
  },
  getAllMentors({ commit }, payload) {
    return new Promise((resolve, reject) => {
      console.log({ payload })
      const { search, pagination } = payload
      usersApi
        .getUsers(
          buildPayloadPagination(pagination, {
            query: [search, 'mentor'].join(','),
            fields: ['name', 'role'].join(',')
          })
        )
        .then((response) => {
          if (response.status === 200) {
            commit(types.ALL_CLASS_MENTORS, response.data.docs)
            commit(types.ALL_CLASS_MENTORS_COUNT, response.data.totalDocs)
            resolve()
          }
        })
        .catch((error) => {
          console.log(error)
          handleError(error, commit, reject)
        })
    })
  },
  addMentee({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { userId, classId } = payload
      classApi
        .createClassMentee(classId, { id: userId })
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  removeMentee({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { userId, classId } = payload
      classApi
        .deleteClassMentee(classId, userId)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  },
  addMentorship({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { classId, mentee, mentor } = payload
      classApi
        .createClassMentorship(classId, { mentee, mentor })
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  removeMentorship({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      const { mentorshipId, classId } = payload
      classApi
        .deleteClassMentorship(classId, mentorshipId)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getClass', { _id: classId })
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
  },
  editClass({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      classApi
        .editClass(payload._id, payload)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getAllClasses')
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
  createClass({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      classApi
        .createClass(payload)
        .then((response) => {
          if (response.status === 201) {
            dispatch('getAllClasses')
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
  deleteClass({ commit, dispatch }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      classApi
        .deleteClass(payload)
        .then((response) => {
          if (response.status === 200) {
            dispatch('getAllClasses')
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

export default {
  state,
  mutations,
  actions,
  getters
}
