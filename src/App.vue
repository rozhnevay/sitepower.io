<template>
  <div v-if="isDataLoaded" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  data () {
    return {
      isDataLoaded: false
    }
  },
  beforeMount() {
    //console.log("node-env " + $cookies.get("sitepower.sid.development" + process.env.NODE_ENV));
    axios.get("/api/user").then((res) => {
      console.log(res);
      this.$store.commit('isUserLoggedIn', true);
      this.$store.commit('setUserName', res.data.user.name);
      this.$router.push({ name: 'Administration' });
      this.isDataLoaded = true;
    }).catch((err) => {
      this.$store.commit('isUserLoggedIn', false);
      this.$store.commit('setUserName', "");
      this.isDataLoaded = true;
      //this.$router.push({ name: 'Home' });
    })
  }
}
</script>

