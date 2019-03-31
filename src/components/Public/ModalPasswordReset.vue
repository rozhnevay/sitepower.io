<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isFormSuccess" class="level">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
                  type="email"
                  :placeholder="emailPlaceholder"
                  name="emailName"
                  v-model="email"
                  @keyup="checkEmailOnKeyUp(email)"
                >
                <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                <span v-if="highlightEmailWithError !== null" class="icon is-small is-right">
                    <i :class="[highlightEmailWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"></i>
                  </span>
              </p>
              <p v-if="highlightEmailWithError" class="help is-danger">{{ emailRequiredLabel }}</p>
            </div>
          </div>
          <div v-if="resetError" class="level"><p class="help is-danger">{{ resetError }}</p></div>
          <div v-if="isFormSuccess" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Password Reset</p>
                <p class="heading"Check Your Email with instructions to complete</p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="!isFormSuccess" type="submit" class="button is-info">{{ primaryBtnLabel }}</button>
          <button v-if="isFormSuccess" type="button" class="button is-info" @click="closeModal">{{ btnResetLabel }}</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
  import { isValidEmail } from '../../validators';
  import axios from "axios";

  export default {
    name: 'reset-component',

    data () {
      return {
        modalTitle: 'Reset Password',
        primaryBtnLabel: 'Reset',
        emailRequiredLabel: 'Email required',
        emailNotValidLabel: 'Valid email required',
        btnResetLabel: 'Close',
        emailPlaceholder: 'Your email',
        email: '',
        highlightEmailWithError: null,
        isFormSuccess: false,
        resetError : ''
      };
    },

    computed: {
      openModal () {
        return this.$store.getters.isResetModalOpen;
      }
    },

    methods: {
      closeModal () {
        this.$store.commit('showResetModal', false);
      },
      reset: (email) => {
        let data = {
          email: email
        }
        return axios.post("/api/reset", data)
      },
      checkForm (e) {
        e.preventDefault();

        if (this.email) {
          this.highlightEmailWithError = false;

          this.reset(this.email).then((res) => {
            console.log("success");
            this.isFormSuccess = true;
            this.resetError = false;
          }).catch((err)=>{
            this.isFormSuccess = false;
            this.resetError = "Error: " + err.toString();
          })

        }

        if (!this.email) {
          this.highlightEmailWithError = true;

          if (this.email && !isValidEmail(this.email)) {
            this.emailRequiredLabel = this.emailNotValidLabel;
          }
        } else {
          this.highlightEmailWithError = false;
        }
      },
      checkEmailOnKeyUp (emailValue) {
        if (emailValue && isValidEmail(emailValue)) {
          this.highlightEmailWithError = false;
        } else {
          this.highlightEmailWithError = true;

          if (!isValidEmail(emailValue)) {
            this.emailRequiredLabel = this.emailNotValidLabel;
          }
        }
      }
    }
  };
</script>

<style lang="scss">
  .fa-exclamation-circle {
    color: red;
  }
  .fa-check {
    color: green;
  }
</style>


