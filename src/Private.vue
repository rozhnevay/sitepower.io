<template>
  <div>
    <div v-if="isUserLoggedIn" id="private">
        <header-component></header-component>
        <router-view></router-view>
    </div>
    <div v-else>
      <h1>You are not authorized!</h1>
    </div>
  </div>
</template>

<script>
  import Header from './components/Private/Header';
  export default {
    name: 'Private',
    components: {
      'header-component': Header
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.USER_LOGGED_IN;
      }
    }
  }
</script>
