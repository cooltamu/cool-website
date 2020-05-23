export default [
  {
    path: '/dashboard/admin/cities',
    name: 'admin-cities',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-cities" */ '@/components/AdminCities.vue'
      )
  },
  {
    path: '/dashboard/admin/users',
    name: 'admin-users',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminUsers.vue'
      )
  }
]
