export default [
  {
    path: '/dashboard/app',
    name: 'app',
    meta: {
      requiresAuth: false
    },
    component: () => import('@/App.vue')
  }
]
