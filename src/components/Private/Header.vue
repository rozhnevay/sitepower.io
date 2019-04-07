<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <a href=""><img src="../../assets/logo.svg" width="236px" alt=""></a>
      </div>
      <div v-if="isUserLoggedIn" class="menu">
        <ul>
          <li class="active"><a href="">My Chats <span class="badge badge-warning">5</span></a></li>
          <li><a @click="chatOpen">Widget Designer</a></li>
          <li><a @click="prefOpen">Payments <span class="badge badge-warning">{{account.balance}}</span></a></li>
        </ul>
      </div>
      <menu-component></menu-component>
    </div>
  </div>
</template>

<script>
  import Menu from '../General/Menu';
  export default {
    name: "private-header-component",
    data () {
      return {
        isMenuOpen: false,
        account:{
          balance : "15$"
        }
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
