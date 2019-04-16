<template>
  <div class="fade modal"  id="chatinfo" tabindex="-1" role="dialog">
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
                <input type="name" class="form-control" id="name" required placeholder="Ivan Orlov" v-model="name">
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="abc@example.com" v-model="login">
              </div>
              <div class="form-group mb-0">
                <label for="phone">Phone</label>
                <input type="phone" class="form-control" id="phone" placeholder="+79282365896" v-model="phone">
              </div>
              <button class="btn btn-black mt-20 w-100">Save</button>
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
    name: 'ModalChatInfo',
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
        this.$store.commit("setActiveChatContact", {name:this.name, login:this.login, phone:this.phone});
        jquery('#chatinfo').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },

    },
    mounted: function () {
      let that = this;
      this.$root.$on('chatinfo_open', function (item) {
        that.name = item.name;
        that.login = item.login;
        that.phone = item.phone;
      })
    }

  }
</script>


