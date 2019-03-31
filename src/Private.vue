<template>
  <div>
    <div v-if="isUserLoggedIn" id="private">
        <header-component></header-component>
        <body-component></body-component>
    </div>
    <div v-else>
      <h1>You are not authorized!</h1>
    </div>
  </div>
</template>

<script>
  import Header from './components/Private/Header';
  import Body from './components/Private/Body';




  export default {
    name: 'Private',
    components: {
      'header-component': Header,
      'body-component': Body
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      }
    }
  }
</script>

<style lang="scss" src="./global-style.scss">
</style>
