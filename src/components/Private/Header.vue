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
      <div v-if="isUserLoggedIn" class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right text-uppercase">
          <li><a @click="chatOpen">My Chats</a></li>
          <li><a @click="prefOpen">My Preferences</a></li>
        </ul>
      </div>
      <div v-show="isMenuOpen" class="navbar-end">
        <menu-component></menu-component>
      </div>

      <div class="navbar-end is-hidden-mobile">
        <menu-component></menu-component>
      </div>
    </div>
  </nav>
</template>

<script>
  import Menu from '../General/Menu';
  export default {
    name: "private-header-component",
    data () {
      return {
        isMenuOpen: false
      }
    },
    methods : {
      chatOpen () {
        this.$store.commit('privateOpen', 'Chat');
      },
      prefOpen() {
        this.$store.commit('privateOpen', 'Pref');
      },
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      }
    },
    components: {
      'menu-component': Menu
    },
  }
</script>

