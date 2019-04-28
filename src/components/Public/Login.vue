<template>
  <div class="modal-show">
    <div class="modal" id="login" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-login modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body p-0">

            <div class="md-header">
              <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
            </div>
            <div class="md-main">
              <form @submit="checkForm" action="#" method="POST">
                <div class="form-group">
                  <label for="email">Адрес электронной почты</label>
                  <input type="email" class="form-control" required id="email" placeholder="abc@example.com" v-model="email">
                </div>
                <div class="form-group mb-0">
                  <label for="password">Пароль</label>
                  <input type="password" class="form-control" required id="password" placeholder="" v-model="password">
                </div>
                <router-link class="md-fp" to="/reset">Забыли пароль?</router-link>
                <button class="btn btn-black w-100" >Вход</button>
                <router-link class="md-su" to="/registration">Зарегистрироваться!</router-link>
                <div v-if="loginError" class="level"><p class="text-danger">{{ loginError }}</p></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'login-component',

    data () {
      return {
        email : '',
        password : '',
        loginError: ''
      };
    },
    methods: {
      checkForm (e) {
        e.preventDefault();
        this.$store.dispatch('AUTH_LOGIN', {email: this.email, password: this.password})
          .then(() => this.$router.push({name: 'Chats'}))
          .catch(err => {
            this.loginError = (err.response && err.response.status === 400) ? "Неверное имя пользователя или пароль" : "Ошибка сервера"
          });
      },
    }
  };
</script>


