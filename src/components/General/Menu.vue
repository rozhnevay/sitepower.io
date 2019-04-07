<template>
  <div>
    <div v-if="isDataLoaded" class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
						<span class="icon">
							<i class="fas fa-user-plus"></i>
						</span>
            <span>{{ signupLabel }}</span>
          </a>
        </p>
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
						<span class="icon">
							<i class="fas fa-user"></i>
						</span>
            <span>{{ loginLabel }}</span>
          </a>
        </p>
      </div>
    </div>
    <!--<div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable">-->
      <!--<a class="navbar-link">-->
        <!--Welcome {{ getUserName }}-->
      <!--</a>-->
      <!--<div class="navbar-dropdown is-boxed">-->
        <!--<hr class="navbar-divider">-->
        <!--<a class="navbar-item" @click="logout">-->
          <!--{{ logoutLabel }}-->
        <!--</a>-->
      <!--</div>-->
    <!--</div>-->
    <div v-if="isUserLoggedIn" class="buttons">
      <div class="btn-group">
        <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ getUserName }}
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button" @click="chatOpen">Chats</button>
          <button class="dropdown-item" type="button">Payments <span class="badge badge-warning">55$</span></button>
          <button class="dropdown-item" type="button" @click="prefOpen">Settings</button>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click="logout">{{ logoutLabel }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'menu-component',
    data () {
      return {
        logoutLabel: 'Log out',
        loginLabel: 'Log in',
        signupLabel: 'Sign up',
        privateLabel: 'My Account',
        isDataLoaded: false
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
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
      getUserName () {
        return this.$store.getters.getUserName;
      }
    },

    methods: {
      logout () {
        axios.get("/api/logout").then((res) => {
          this.$store.commit('isUserLoggedIn', false);
          this.$store.commit('isUserSignedUp', false);
          this.$store.commit('logout', true);
          this.$store.commit('privateOpen', 'Chat');
          this.$router.push({ name: 'homepage-component' });

        });

      },
      showLoginModal () {
        this.$store.commit('showLoginModal', true);
      },
      showSignupModal () {
        this.$store.commit('showSignupModal', true);
      },
      chatOpen () {
        this.$store.commit('privateOpen', 'Chat');
      },
      prefOpen() {
        this.$store.commit('privateOpen', 'Pref');
      },
    }
  }
</script>


