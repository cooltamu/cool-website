export default [
  {
    path: '/attendance',
    name: 'attendance',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "profile" */ '@/components/MeetingAttendance.vue'
      )
  }
]
