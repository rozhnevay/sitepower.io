<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <a href=""><img src="../../assets/logo.svg" width="236px" alt=""></a>
      </div>
      <div class="menu">
        <ul>
          <li :class="[ activeComponent == 'Chat' ?  'active' : '' ]" @click="chatOpen"><a href="#">Chats <span v-if="count > 0" class="badge badge-warning">{{count}}</span></a></li>
          <li :class="[ activeComponent == 'Pref' ?  'active' : '' ]" @click="prefOpen"><a href="#">Administration</a></li>
          <li :class="[ activeComponent == 'Pay' ?  'active' : '' ]"><a href="#">Payments <span class="badge badge-warning">{{account.balance}}</span></a></li>
        </ul>
      </div>
        <div class="btn-group">
          <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ getUserName }}
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button" @click="chatOpen">Chats</button>
            <button class="dropdown-item" type="button" @click="prefOpen">Administration</button>
            <button class="dropdown-item" type="button">Payments <span class="badge badge-warning">55$</span></button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="logout">{{ logoutLabel }}</button>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "private-header-component",
    data () {
      return {
        isMenuOpen: false,
        logoutLabel: 'Log out',
        account:{
          balance : "15$"
        }
      }
    },
    beforeMount() {

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

    },
    methods : {
      chatOpen () {
        this.$store.commit('privateOpen', 'Chat');
      },
      prefOpen() {
        this.$store.commit('privateOpen', 'Pref');
      },
      logout () {
        axios.get("/api/logout").then((res) => {
          this.$store.commit('isUserLoggedIn', false);
          this.$store.commit('isUserSignedUp', false);
          this.$router.push({ name: 'homepage-component' });

        });

      },
      chatOpen () {
        this.$store.commit('privateOpen', 'Chat');
      },
      prefOpen() {
        this.$store.commit('privateOpen', 'Pref');
      }
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
      count () {
        let cnt = 0;
        this.$store.getters.getChats.forEach(item => {cnt = parseInt(item.countUnread(), 10) + cnt});
        return cnt;
      },
      getUserName () {
        return this.$store.getters.getUserName;
      },
      activeComponent() {
        return this.$store.getters.privateOpen
      }
    },

  }
</script>
