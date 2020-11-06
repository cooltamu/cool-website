export default [
  {
    path: '/points',
    name: 'points',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Points.vue')
  }
]
