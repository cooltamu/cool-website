export default [
  {
    path: '/sessions/',
    name: 'sessions',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Sessions.vue')
  }
]
