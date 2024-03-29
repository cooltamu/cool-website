export default [
  {
    path: '/dues',
    redirect: (Route) => {
      window.location.href =
        'https://secure.touchnet.com/C21490_ustores/web/product_detail.jsp?PRODUCTID=13609'
      return '/redirecting' // not important since redirecting
    }
  },
  {
    path: '/meeting',
    redirect: (Route) => {
      window.location.href = 'https://tamu.zoom.us/j/91510750886'
      return '/redirecting' // not important since redirecting
    }
  },
  {
    path: '/redirecting',
    component: () =>
      import(/* webpackChunkName: "notfound" */ '@/components/Redirecting.vue')
  },
  {
    path: '/shirts',
    redirect: (Route) => {
      window.location.href =
        'https://secure.touchnet.com/C21490_ustores/web/product_detail.jsp?PRODUCTID=15069'
      return '/redirecting' // not important since redirecting
    }
  }
]
