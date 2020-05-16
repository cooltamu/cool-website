<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="images/logo.png" width="200" height="50" alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
            <li class="nav-item">
              <a href="#volunteer" class="nav-link">Volunteer</a>
            </li>
            <li class="nav-item">
              <a href="#mission" class="nav-link">Mission</a>
            </li>
            <li class="nav-item">
              <a href="#snapshot" class="nav-link">Snapshot</a>
            </li>
            <li class="nav-item">
              <a href="about.html" class="nav-link">Who we are</a>
            </li>
            <li class="nav-item">
              <a href="contact.html" class="nav-link">Contact</a>
            </li>
          </ul>
          <router-link :to="{ name: 'home' }">
            <button class="btn btn-primary navbar-btn">Dashboard</button>
          </router-link>
        </div>
      </div>
    </nav>
    <!-- END nav -->

    <div
      class="hero-wrap"
      style="background-image: url('images/bg_1.jpg');"
      data-stellar-background-ratio="0.5"
    >
      <div class="overlay"></div>
      <div id="home" class="container">
        <div
          class="row no-gutters slider-text align-items-center justify-content-end"
          data-scrollax-parent="true"
        >
          <div
            class="col-md-6 order-md-last ftco-animate mt-5"
            data-scrollax=" properties: { translateY: '70%' }"
          >
            <h1
              class="mb-4"
              data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
            >
              Impact Future Generations
            </h1>
            <p>
              <a href="#" class="btn btn-black py-3 px-4">How Can I Help</a>
            </p>
          </div>
          <div class="col-md-6 d-none d-md-block">
            <div class="play-video pb-5 d-flex align-items-center">
              <p>
                <a href="https://vimeo.com/45830194" class="popup-vimeo"
                  ><span class="icon"><i class="ion-ios-play"></i></span>
                  <span class="play">Play video</span></a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="app"></div>

    <section class="testimony-section">
      <div class="container">
        <div class="row ftco-animate justify-content-center">
          <div class="col-md-6 d-flex">
            <div
              class="testimony-img"
              style="background-image: url(images/testimony-img.png);"
            ></div>
          </div>
          <div class="col-md-6 py-5">
            <div
              class="heading-section heading-section-white pt-4 ftco-animate"
            >
              <h2 class="mb-0">Success Stories</h2>
            </div>
            <div class="carousel-testimony owl-carousel ftco-owl">
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jeff Nucci</p>
                      <span class="position">Businessman</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jeff Nucci</p>
                      <span class="position">Businessman</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jeff Nucci</p>
                      <span class="position">Businessman</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jeff Nucci</p>
                      <span class="position">Businessman</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jeff Nucci</p>
                      <span class="position">Businessman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="ftco-footer ftco-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Aid.</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <ul
                class="ftco-footer-social list-unstyled float-md-left float-lft mt-5"
              >
                <li class="ftco-animate">
                  <a href="#"><span class="icon-twitter"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#"><span class="icon-facebook"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#"><span class="icon-instagram"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4 ml-md-5">
              <h2 class="ftco-heading-2">Information</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Donation</a></li>
                <li><a href="#" class="py-2 d-block">Privacy</a></li>
                <li><a href="#" class="py-2 d-block">Terms Condition</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Links</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Home</a></li>
                <li><a href="#" class="py-2 d-block">Who we are</a></li>
                <li><a href="#" class="py-2 d-block">Causes</a></li>
                <li><a href="#" class="py-2 d-block">Blog</a></li>
                <li><a href="#" class="py-2 d-block">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li>
                    <span class="icon icon-map-marker"></span
                    ><span class="text"
                      >203 Fake St. Mountain View, San Francisco, California,
                      USA</span
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><span class="icon icon-phone"></span
                      ><span class="text">+2 392 3929 210</span></a
                    >
                  </li>
                  <li>
                    <a href="#"
                      ><span class="icon icon-envelope"></span
                      ><span class="text">info@yourdomain.com</span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <p class="d-none">
              <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
              Copyright &copy;2020 All rights reserved | This template is made
              with <i class="icon-heart color-danger" aria-hidden="true"></i> by
              <a href="https://colorlib.com" target="_blank">Colorlib</a>
              <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CoolLanding',
  metaInfo() {
    return {
      title: this.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.appTitle
        },
        { name: 'application-name', content: this.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },
  components: {},
  computed: {
    appTitle() {
      return this.$store.getters.appTitle
    }
  }
}
</script>
