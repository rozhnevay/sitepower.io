<template>
  <div class="modal-show">
    <div class="modal" id="signup" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-login modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body p-0">

            <div class="md-header">
              <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
            </div>

            <div class="md-main">
              <form @submit="checkForm" action="#" method="POST">
                <div class="form-group">
                  <label for="name">Ваше имя</label>
                  <input type="text" class="form-control" required id="name" placeholder="Ivan Orlov" v-model="name">
                </div>
                <div class="form-group">
                  <label for="email">Адрес электронной почты</label>
                  <input type="email" class="form-control" required id="email" placeholder="abc@example.com" v-model="email">
                </div>
                <div class="form-group">
                  <label for="password">Пароль</label>
                  <input type="password" class="form-control" required id="password" placeholder="Enter your password" v-model="password">
                </div>
                <div class="form-group mb-0">
                  <label for="re-password">Повторите пароль</label>
                  <input type="password" class="form-control" required id="re-password" placeholder="Repeat your password" v-model="repeatPassword">
                </div>
                <button class="btn btn-black mt-20 w-100">Зарегистрироваться</button>
                <div v-if="signupError" class="level"><p class="text-danger">{{ signupError }}</p></div>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from "axios";

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
  }
};
</script>



