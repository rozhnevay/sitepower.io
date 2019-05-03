<template>
  <div class="fade modal"  id="chatsend" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-login modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="md-header">
            <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
          </div>

          <div class="md-main">
            <form @submit="checkForm" action="#" method="POST">
              <div class="form-group">
                <label >Диалог отправлен Вам на почту</label>
              </div>
              <button class="btn btn-black mt-20 w-100">OK</button>
            </form>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as jquery from 'jquery'
  export default {
    name: 'ModalSend',
    data () {
      return {
        name: '',
        login: '',
        phone : ''
      };
    },
    methods: {
      checkForm (e) {
        e.preventDefault();
        jquery('#chatsend').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },

    },

  }
</script>


