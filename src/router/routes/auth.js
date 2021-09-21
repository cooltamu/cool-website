export default [
  {
    path: '/dashboard/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/components/Login.vue')
  },
  {
    path: '/dashboard/signup',
    name: 'signup',
    alias: '/signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/components/SignUp.vue')
  },
  {
    path: '/dashboard/verify/:id',
    name: 'verify',
    component: () =>
      import(/* webpackChunkName: "verify" */ '@/components/Verify.vue')
  },
  {
    path: '/dashboard/forgot',
    name: 'forgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "forgotPassword" */ '@/components/ForgotPassword.vue'
      )
  },
  {
    path: '/dashboard/reset/:id',
    name: 'resetPassword',
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ '@/components/ResetPassword.vue'
      )
  }
]
