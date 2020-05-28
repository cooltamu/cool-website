export default [
  {
    path: '/dashboard/classes',
    name: 'classes',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Classes.vue')
  },
  {
    path: '/dashboard/classes/:id',
    name: 'classes',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Classes.vue')
  }
]
