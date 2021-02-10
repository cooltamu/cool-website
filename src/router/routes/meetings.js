export default [
  {
    path: '/meetings',
    name: 'meetings',
    alias:  '/dashboard/meetings',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/MeetingsList.vue')
  }
]
