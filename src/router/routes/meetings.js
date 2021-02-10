export default [
  {
    path: '/meetings',
    name: 'meetings',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/MeetingsList.vue')
  }
]
