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
  },
  {
    path: '/dashboard/admin/events',
    name: 'admin-events',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminEvents.vue'
      )
  },
  {
    path: '/dashboard/admin/testcards',
    name: 'admin-testcards',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/TestCardSwipes.vue'
      )
  }
]
