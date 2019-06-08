<template>
  <div class="fade modal"  id="newsite" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-login modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="md-header">
            <img src="../../assets/logo-black.svg" width="235px" height="48px" alt="">
          </div>

          <div class="md-main">
            <!--<form @submit="checkForm" action="#" method="POST">-->

              <div class="container">
                <ul class="nav nav-tabs">
                  <li><a class="active" data-toggle="tab" href="#newsite-chat" @click="setType('chat')">Чат на сайте</a></li>
                  <li><a data-toggle="tab" href="#newsite-vk" @click="setType('vk')">Вконтакте</a></li>
                  <li><a data-toggle="tab" href="#newsite-fb" @click="setType('fb')">Facebook</a></li>
                </ul>

                <div class="tab-content">
                  <div id="newsite-chat" class="tab-pane active">
                    <div class="form-group">
                      <label for="name">Укажите адрес Вашего сайта</label>
                      <input type="name" class="form-control" id="name" required placeholder="sitepower.io" v-model="origin">
                      <p class="text-muted">Укажите без "http://" и "www"</p>
                    </div>
                  </div>
                  <div id="newsite-vk" class="tab-pane fade">
                    <h5>Общайтесь с пользователями Вконтакте напрямую из приложения</h5>
                    <p>Нажмите "Добавить" для подключения группы VK</p>
                  </div>
                  <div id="newsite-fb" class="tab-pane fade">
                    <h5>Общайтесь с пользователями Facebook напрямую из приложения</h5>
                    <p>Нажмите "Добавить" для подключения группы Fb</p>
                  </div>
                </div>
              </div>
              <button @click="checkForm" class="btn btn-black mt-20 w-100">Добавить</button>
            <!--</form>-->

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as jquery from 'jquery';
  export default {
    name: 'ModalNewSite',
    data () {
      return {
        origin: '',
        type: 'chat'
      };
    },
    methods: {
      setType(tip) {
        this.type = tip;
      },
      checkForm (e) {
        e.preventDefault();
        if (this.type === "chat") {
          this.$store.dispatch('FORM_CREATE', this.origin);
          this.$root.$emit("newsite_added");
        } else if (this.type === "vk"){
           window.location.replace('https://oauth.vk.com/authorize?client_id=7003708&display=page&redirect_uri=https://app.sitepower.io/private/vk&scope=groups,offline&response_type=token&v=5.95&state=123456');
        }


        jquery('#newsite').modal('hide');
        jquery('body').removeClass('modal-open');
        jquery('.modal-backdrop').remove();
      },

    },
    mounted: function () {
      let that = this;
      this.$root.$on('newsite_open', function () {
        that.origin = '';
      })
    }

  }
</script>


