export default [
  {
    path: '/dashboard/landing',
    name: 'landing',
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/components/Members.vue')
  }
]
