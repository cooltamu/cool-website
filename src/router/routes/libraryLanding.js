export default [
  {
    path: '/library',
    name: 'library',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Library.vue')
  }
]
