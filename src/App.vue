<template>
  <div v-if="isDataLoaded" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isDataLoaded: false
    }
  },
  beforeMount() {
    this.$store.dispatch('AUTH_USER')
      .then(() => {
        this.isDataLoaded = true;
        this.$router.push({name: 'Chat'})
      })
      .catch(() => this.isDataLoaded = true);
  }
}
</script>

