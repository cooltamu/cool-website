<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            id="CoolLandingLogo"
            src="images/logo.png"
            width="200"
            height="50"
            alt=""
          />
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
              <a href="#team" class="nav-link">Team</a>
            </li>
            <li class="nav-item">
              <a href="#footerContact" class="nav-link">Contact</a>
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
              <a href="#volunteer" class="btn btn-black py-3 px-4"
                >How Can I Help</a
              >
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

    <section class="ftco-section ftco-no-pt ftco-no-pb ftco-volunteer">
      <div class="container">
        <div class="row">
          <div
            id="volunteer"
            class="col-md-7 img-volunteer"
            style="background-image: url(images/about.jpg);"
          >
            <div class="row no-gutters justify-content-end">
              <div class="col-lg-7">
                <div class="text py-5 pl-md-4 pr-md-3">
                  <h2 class="mb-4">We need volunteers.</h2>
                  <p style="color: black;">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics
                  </p>
                  <p>
                    <a
                      href="https://forms.gle/u3qPL6Ue4F4Dssk8A"
                      class="btn btn-primary py-3 px-4"
                      >Join now</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 d-flex align-items-center bg-black">
            <div class="about-text py-5 pl-md-5">
              <h2>
                <strong class="number" data-number="120">0</strong> Members
                joined and counting.
              </h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics
              </p>
              <p>
                <a href="#" class="btn btn-black py-3 px-4"
                  >DK what this button should link to</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="services-section py-5 py-md-0 bg-light">
      <div id="mission" class="container">
        <div class="col heading-section text-center ftco-animate">
          <h2 class="mb-4">
            Mission
          </h2>
          <p style="color: black;">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia
          </p>
        </div>
        <div class="row no-gutters d-flex">
          <div class="col-md-6 col-lg-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-charity"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Help &amp; Support</h3>
                <p style="color: black;">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-adoption"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Adoption</h3>
                <p style="color: black;">
                  A small river named Duden flows by their place and supplies.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-volunteer"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Volunteering</h3>
                <p style="color: black;">
                  A small river named Duden flows by their place and supplies.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-open-book"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Education</h3>
                <p style="color: black;">
                  A small river named Duden flows by their place and supplies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="snapshot" class="ftco-section ftco-causes">
      <div class="container">
        <div class="row justify-content-center pb-3">
          <div class="col-md-10 heading-section text-center ftco-animate">
            <h2 class="mb-4">
              Snapshots
            </h2>
            <p>
              Quotes and thoughts from our community!
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="carousel-causes owl-carousel">
              <div class="item">
                <a
                  data-toggle="modal"
                  data-target="#snapshot1"
                  class="causes text-center"
                >
                  <div
                    class="img"
                    style="background-image: url(images/causes-1.jpg);"
                  ></div>
                  <h2>Random Mentor</h2>
                </a>
              </div>
              <div class="item">
                <a
                  data-toggle="modal"
                  data-target="#snapshot1"
                  class="causes text-center"
                >
                  <div
                    class="img"
                    style="background-image: url(images/causes-2.jpg);"
                  ></div>
                  <h2>Random Mentee</h2>
                </a>
              </div>
              <div class="item">
                <a
                  data-toggle="modal"
                  data-target="#snapshot1"
                  class="causes text-center"
                >
                  <div
                    class="img"
                    style="background-image: url(images/causes-3.jpg);"
                  ></div>
                  <h2>Random Teacher</h2>
                </a>
              </div>
              <div class="item">
                <a
                  data-toggle="modal"
                  data-target="#snapshot1"
                  class="causes text-center"
                >
                  <div
                    class="img"
                    style="background-image: url(images/causes-4.jpg);"
                  ></div>
                  <h2>Tamu Guy</h2>
                </a>
              </div>
              <div class="item">
                <a
                  data-toggle="modal"
                  data-target="#snapshot1"
                  class="causes text-center"
                >
                  <div
                    class="img"
                    style="background-image: url(images/causes-5.jpg);"
                  ></div>
                  <h2>Cool</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="modal fade"
      id="snapshot1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="snapshot1"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Name/ Description
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Some text about the quote and a lot of cute fun things yay
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="testimony-section">
      <div id="team" class="container">
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
              <h2 class="mb-0">Team</h2>
            </div>
            <div class="carousel-testimony owl-carousel ftco-owl">
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jonathan Thomas</p>
                      <span class="position">President</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Blessina Babu</p>
                      <span class="position">Vice President</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Madeline Grice</p>
                      <span class="position"
                        >Parliamentarian & Data Analytics Manager</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Samira Islam-Mina</p>
                      <span class="position">Director of Communications</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Aakash Kothari</p>
                      <span class="position">Director of Outreach</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Auva Saghafi</p>
                      <span class="position">Director of Social Media</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Jonathan Samuel</p>
                      <span class="position">Technical Director</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Education Manager</p>
                      <span class="position">Hillena Mulat</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Emily Curtis</p>
                      <span class="position">Curriculum Manager</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Kalynn Briles-Moore</p>
                      <span class="position">Fundraising Manager</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Meredith Tabor</p>
                      <span class="position">Art Production Manager</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Lydia Vidales</p>
                      <span class="position">Community Engagement Manager</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Angel Thai</p>
                      <span class="position">Photographer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap pb-4">
                  <div class="text">
                    <p class="mb-4">
                      Blurb
                    </p>
                  </div>
                  <div class="d-flex">
                    <div
                      class="user-img"
                      style="background-image: url(images/person_1.jpg);"
                    ></div>
                    <div class="pos ml-3">
                      <p class="name">Arvind Balaji</p>
                      <span class="position">Technical Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer id="footerContact" class="ftco-footer ftco-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">COOL</h2>
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
