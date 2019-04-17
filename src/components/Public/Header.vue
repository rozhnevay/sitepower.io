<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <a href=""><img src="http://cdn.nerokore.com/public/sp/assets/img/logo.svg" width="236px" height="48px" alt=""></a>
      </div>
      <div class="menu">
        <ul>
          <li class="active"><a href="">Home</a></li>
          <li><a href="">Features</a></li>
          <li><a href="">Pricing</a></li>
          <li><a href="">Download</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </div>
      <div class="buttons d-flex justify-content-center">
        <button type="button" class="btn btn-outline-light mr-2" data-target="#signup" data-toggle="modal" @click="showSignupModal"><i class="fas fa-user-plus"></i> Sign Up</button>
        <button type="button" class="btn btn-outline-warning" data-target="#login" data-toggle="modal" @click="showLoginModal"><i class="fas fa-user"></i> Log In</button>
      </div>
    </div>
  </div> <!-- END HEADER -->
</template>

<script>
    import axios from "axios";
    export default {
        name: "header-component",
        data () {
          return {
            isMenuOpen: false
          }
        },
      methods : {
        showLoginModal () {
          this.$root.$emit("login_open");
        },
        showSignupModal () {
          this.$root.$emit("signup_open");
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
    }
</script>

