export default [
  {
    path: '/members',
    name: 'members',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Members.vue')
  }
]
