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

  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'menu-component',
    data () {
      return {

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

      showLoginModal () {
        this.$store.commit('showLoginModal', true);
      },
      showSignupModal () {
        this.$store.commit('showSignupModal', true);
      },

    }
  }
</script>


