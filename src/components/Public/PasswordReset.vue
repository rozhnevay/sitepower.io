<template>
  <div class="modal-show">
    <div class="modal" id="forgot" tabindex="-1" role="dialog">
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
                <button class="btn btn-black w-100">Отправить</button>
              </form>

            </div>
            <div v-if="resetError" class="level"><p class="text-danger">{{ resetError }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>export default {
    name: 'reset-component',

    data () {
      return {
        email : '',
        resetError : ''
      };
    },

    methods: {
      checkForm (e) {
        e.preventDefault();
        this.$store.dispatch('AUTH_RESET', {email: this.email})
          .then(() => this.$router.push({name: 'PasswordResetSuccess'}))
          .catch(err => {
            this.resetError = (err.response && err.response.status == "400") ? "Пользователь с таким email не найден" : "Ошибка сервера"
          });
      },
    }
  };
</script>
