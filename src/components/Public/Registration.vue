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
                  <input type="text" class="form-control" required id="name" placeholder="Иван Орлов" v-model="name">
                </div>
                <div class="form-group">
                  <label for="email">Адрес электронной почты</label>
                  <input type="email" class="form-control" required id="email" placeholder="abc@example.com" v-model="email">
                </div>
                <div class="form-group">
                  <label for="password">Пароль</label>
                  <input type="password" class="form-control" required id="password" placeholder="" v-model="password">
                </div>
                <div class="form-group mb-0">
                  <label for="re-password">Повторите пароль</label>
                  <input type="password" class="form-control" required id="re-password" placeholder="" v-model="repeatPassword">
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
    checkForm (e) {
      e.preventDefault();
      this.$store.dispatch('AUTH_REGISTER', {name: this.name, email: this.email, password: this.password})
        .then(() => this.$router.push({name: 'Chats'}))
        .catch(err => {
          this.signupError = (err.response && err.response.status == "400") ? "Не удалось зарегистрировать пользователя: указанный email уже существует" : "Ошибка сервера"
        });
    },
  }
};
</script>



