<template>
  <nav class="navbar navbar-default navbar-fixed-top templatemo-nav" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon icon-bar"></span>
          <span class="icon icon-bar"></span>
          <span class="icon icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right text-uppercase">
          <li><a href="#home">Home</a></li>
          <li><a href="#feature">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#download">Download</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <!-- For mobile and tablet -->
      <div v-show="isMenuOpen" class="navbar-end">
        <menu-component></menu-component>
      </div>

      <!-- For desktop -->
      <div class="navbar-end is-hidden-mobile">
        <menu-component></menu-component>
      </div>
    </div>
  </nav>
</template>

<script>
    import Menu from '../General/Menu';
    export default {
        name: "header-component",
        data () {
          return {
            isMenuOpen: false
          }
        },
      components: {
        'menu-component': Menu
      },
    }
</script>

