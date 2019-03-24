<template>
  <div>
    <div class="navbar-item">
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
    <div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        Welcome {{ getUserName }}
      </a>
      <div class="navbar-dropdown is-boxed">
        <hr class="navbar-divider">
        <a class="navbar-item" @click="logout">
          {{ logoutLabel }}
        </a>
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
        signupLabel: 'Sign up'
      }
    },

    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
      getUserName () {
        let name = this.$store.getters.getUserName;

        if (name === '') {
          return 'user';
        } else {
          return name;
        }
      }
    },

    methods: {
      logout () {
        axios.get("/api/logout").then((res) => {
          this.$store.commit('isUserLoggedIn', false);
          this.$store.commit('isUserSignedUp', false);
          this.$store.commit('logout', true);
          this.$router.push({ name: 'homepage-component' });

        });

      },
      showLoginModal () {
        this.$store.commit('showLoginModal', true);
      },
      showSignupModal () {
        this.$store.commit('showSignupModal', true);
      }
    }
  }
</script>

