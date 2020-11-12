export default [
  {
    path: '/dropoff',
    name: 'dropoff',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/DropOff.vue')
  }
]
