export default [
  {
    path: '/graphics',
    name: 'graphics',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "graphics" */ '@/components/Graphics.vue')
  }
]
