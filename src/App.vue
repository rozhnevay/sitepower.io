<template>
  <div v-if="isDataLoaded" id="app">
    <div v-if="isUserLoggedIn" >
      <private-component></private-component>
    </div>
    <div v-else="isUserLoggedIn" >
      <public-component></public-component>
    </div>

  </div>
</template>

<script>
import Private from './Private';
import Public from './Public';
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
  components: {
    'public-component' : Public,
    'private-component' : Private
  },
  beforeMount() {
    //console.log("node-env " + $cookies.get("sitepower.sid.development" + process.env.NODE_ENV));
    axios.get("/api/user").then((res) => {
      console.log(res);
      this.$store.commit('isUserLoggedIn', true);
      this.$store.commit('setUserName', res.data.user.name);
      this.$store.commit('privateOpen', 'Chat');
      this.isDataLoaded = true;
    }).catch((err) => {
      this.$store.commit('isUserLoggedIn', false);
      this.$store.commit('setUserName', "");
      this.isDataLoaded = true;
    })
  }
}
</script>

