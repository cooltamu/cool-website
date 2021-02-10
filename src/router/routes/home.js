export default [
  {
    path: '/dashboard/home',
    name: 'home',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/Members.vue')
  }
]
