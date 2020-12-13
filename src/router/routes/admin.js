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
    path: '/dashboard/admin/library',
    name: 'admin-library',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminLibrary.vue'
      )
  },
  {
    path: '/dashboard/admin/library/books',
    name: 'admin-book',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminBooks.vue'
      )
  },
  {
    path: '/dashboard/admin/classes',
    name: 'admin-classes',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "classes" */ '@/components/Classes.vue')
  },
  {
    path: '/dashboard/admin/classes/:classId',
    name: 'classes',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/components/ClassOverview.vue')
  },
  {
    path: '/dashboard/admin/events/:id',
    name: 'admin-event',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminAttendance.vue'
      )
  },
  {
    path: '/dashboard/admin/sessions',
    name: 'admin-sessions',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminSessions.vue'
      )
  }
]
