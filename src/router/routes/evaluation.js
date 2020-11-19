export default [
  {
    path: '/evaluation',
    alias: '/eval',
    name: 'evaluation',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/Evaluation.vue')
  }
]
