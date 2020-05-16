export default [
  {
    path: '/dashboard/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/components/About.vue')
  }
]
