<template>
  <div class="modal fade" id="forgot" tabindex="-1" role="dialog">
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
              <button class="btn btn-black w-100">Reset</button>
            </form>

          </div>
          <div v-if="resetError" class="level"><p class="text-danger">{{ resetError }}</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import * as jquery from 'jquery'

  export default {
    name: 'reset-component',

    data () {
      return {
        email : '',
        resetError : ''
      };
    },

    methods: {

      reset: (email) => {
        let data = {
          email: email
        }
        return axios.post("/api/reset", data)
      },
      close () {
        jquery('#forgot').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },
      checkForm (e) {
        e.preventDefault();

        if (this.email) {
          this.highlightEmailWithError = false;

          this.reset(this.email).then((res) => {
            this.close();
            console.log("success");
          }).catch((err)=>{
            this.resetError = "Ошибка";
            console.log(err);
          })
        }
      },
    },
    mounted: function () {
      let that = this;
      this.$root.$on('forgot_open', function (item) {
        that.email = '';
        that.resetError = '';
      })
    }

  };
</script>
