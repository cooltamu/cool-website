export default [
  {
    path: '/app',
    name: 'app',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import('@/App.vue')
  }
]
