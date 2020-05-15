<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
    id="ftco-navbar"
  >
    <div class="container">
      <a class="navbar-brand" href="index.html">COOL<span>.</span></a>
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
          <li class="nav-item"><a href="#homeTop" class="nav-link">Home</a></li>
          <li class="nav-item">
            <a href="#mission" class="nav-link">Mission</a>
          </li>
          <li class="nav-item">
            <a href="about.html" class="nav-link">Who we are</a>
          </li>
          <li class="nav-item">
            <a href="causes.html" class="nav-link">Causes</a>
          </li>
          <li class="nav-item">
            <a href="blog.html" class="nav-link">Stories</a>
          </li>
          <li class="nav-item">
            <a href="contact.html" class="nav-link">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
