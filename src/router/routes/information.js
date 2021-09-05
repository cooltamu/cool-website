export default [
  {
    path: '/info',
    alias: '/information',
    name: 'information',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Information.vue')
  }
]
