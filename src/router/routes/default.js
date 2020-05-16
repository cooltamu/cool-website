export default [
  {
    path: '/',
    name: 'default',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/CoolLanding.vue')
  }
]
