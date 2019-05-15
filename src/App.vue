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
    let path = this.$router.history.current.path.split("/")[1];
    if (path === "" || path === "login" || path === "private") {
      this.$store.dispatch('AUTH_USER')
        .then(() => {
          this.isDataLoaded = true;
          this.$router.push({name: 'Chats'})
        })
        .catch(() => this.isDataLoaded = true);
    } else {
      this.isDataLoaded = true
    }

  }
}
</script>

