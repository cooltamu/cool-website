export default [
  {
    path: '/library/:id',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Library.vue')
  }
]
