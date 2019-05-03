<template>
  <div class="modal-show">
    <!-- Modal -->
    <div class="modal" id="ps" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-login modal-dialog-centered" role="document">
        <div class="modal-content modal-np">
          <div class="modal-body p-0">

            <div class="md-header">
              <img src="../../assets/logo.svg" width="235px" height="48px" alt="">
            </div>

            <div class="md-np-main text-center">

              <div class="d-flex justify-content-center">
                <img src="../../assets/success.svg" width="80px" height="80px" alt="">
              </div>
              <div class="ps-text mt-20">
                <p>Ссылка на страницу для изменения пароля успешно отравлена на указанный адрес. Следуйте указаниям из письма для смены пароля.</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PasswordResetSuccess',
    created(){
      setTimeout( () => this.$router.push({ name: 'Login'}), 4000);

    }
  }
</script>
