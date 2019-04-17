<template>
  <div class="modal fade" id="signup" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-login modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="md-header">
            <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
          </div>

          <div class="md-main">
            <form @submit="checkForm" action="#" method="POST">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" required id="name" placeholder="Ivan Orlov" v-model="name">
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" required id="email" placeholder="abc@example.com" v-model="email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" required id="password" placeholder="Enter your password" v-model="password">
              </div>
              <div class="form-group mb-0">
                <label for="re-password">Repeat Password</label>
                <input type="password" class="form-control" required id="re-password" placeholder="Repeat your password" v-model="repeatPassword">
              </div>
              <button class="btn btn-black mt-20 w-100">Sign up</button>
              <div v-if="signupError" class="level"><p class="text-danger">{{ signupError }}</p></div>
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
  name: 'registration-component',

  data () {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      signupError : ''
    };
  },


  methods: {
    register (name, email, pass) {
      return axios.post("/api/register", {"email": email,"password": pass, "name": name});
    },
    close () {
      jquery('#signup').modal('hide');
      jquery('body').removeClass('modal-open');
      jquery('.modal-backdrop').remove();
    },
    checkForm (e) {
      e.preventDefault();
      if (this.repeatPassword !== this.password) {
        this.signupError = "Пароли не совпадают";
      } else {
          this.register(this.name, this.email, this.password).then((err, res) => {
            this.$store.commit('setUserName', this.name);
            this.$store.commit('isUserSignedUp', true);
            this.$store.commit('isUserLoggedIn', true);
            this.signupError = "";
            this.close();
          }).catch((err) => {
            this.signupError = "Ошибка при регистрации!";
            console.log(err.response);
          })
      }
    }
  },
  mounted: function () {
    let that = this;
    this.$root.$on('signup_open', function (item) {
      that.name = '';
      that.email = '';
      that.password = '';
      that.repeatPassword = '';
      that.signupError = '';
    })
  }
};
</script>



