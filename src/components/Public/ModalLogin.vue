<template>
  <div class="modal fade" id="login" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-login modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="md-header">
            <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
          </div>

          <div class="md-main">
            <form @submit="checkForm" action="#" method="POST">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" required id="email" placeholder="abc@example.com" v-model="email">
              </div>
              <div class="form-group mb-0">
                <label for="password">Password</label>
                <input type="password" class="form-control" required id="password" placeholder="Enter password" v-model="password">
              </div>
              <a class="md-fp" href="#" data-target="#forgot" data-toggle="modal" @click="showForgotModal">Forgot password?</a>
              <button class="btn btn-black w-100" >Sign in</button>
              <a class="md-su" href="#" data-target="#signup" data-toggle="modal" @click="showSignupModal">Not a member? Sign Up!</a>
              <div v-if="loginError" class="level"><p class="text-danger">{{ loginError }}</p></div>
            </form>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import * as jquery from 'jquery'

  export default {
    name: 'login-component',

    data () {
      return {
        email : '',
        password : '',
        loginError : ''
      };
    },

    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn;
      },
    },

    methods: {
      login: (email, password) => {
        let data = {
            email: email,
            password: password
        }
        return axios.post("/api/login", data)
      },
      close : () => {
        jquery('#login').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },
      checkForm (e) {
        e.preventDefault();

        if (this.email && this.password) {
          this.login(this.email, this.password).then((res) => {

            this.$store.commit('isUserLoggedIn', true);
            this.loginError = "";
            this.$store.commit('setUserName', res.data.name);
            this.close();
            console.log(res);

          }).catch((err)=>{
            this.$store.commit('isUserLoggedIn', false);
            console.log(err);
            this.loginError = "Неверное имя пользователя или пароль";
          })

        }
      },
      showSignupModal () {
        this.close();
        this.$root.$emit("signup_open");
      },
      showForgotModal () {
        this.close();
        this.$root.$emit("forgot_open");
      },
    },
    mounted: function () {
      let that = this;
      this.$root.$on('login_open', function (item) {
        that.email = '';
        that.password = '';
        that.loginError = '';
      })
    }
  };
</script>


