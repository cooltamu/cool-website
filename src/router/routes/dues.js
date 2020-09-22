export default [
  {
    path: '/dues',
    redirect: (to: Route) => {
      window.location.href =
        'https://secure.touchnet.com/C21490_ustores/web/product_detail.jsp?PRODUCTID=13609'
      return '/redirecting' // not important since redirecting
    }
  }
]
