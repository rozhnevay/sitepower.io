<template>
  <div class="chat">
    <div class="messages overflow-auto">
      <!--<div class="systems">-->
        <!--<p class="msg">Клиент открыл чат</p>-->
        <!--<span class="time">18:30:14</span>-->
      <!--</div>-->

      <div v-for="msg in messages" :class="[ msg.direction == 'from_user' ?  'admin' : 'client' ]">
        <span class="msg">{{msg.body}}</span>
        <span class="time">{{msg.created | moment("HH:mm:ss")}}</span>
      </div>

      <!--<div class="admin">
        <span class="time">18:32:42</span>
        <span class="msg">Добрый день, где именно у вас возникли трудности? Вот пошаговая инструкция: 1. Нажмите на кнопку «Регистрация» в правом верхнем углу. 2. Заполните поля и нажмите  «Зарегистрироваться». 3. Подтвердите вашу почту по сообщению которое пришло вам на Email. 4. Войдите с помощью ваших данных. Если возникли вопросы, позвоните нам: +7(708)32-32-1 Звонок Бесплатный</span>
      </div>

      <div class="new-msg-separator">
        Новые сообщения
      </div>

      <div class="client">
        <span class="msg">Спасибо большое за ответ</span>
        <span class="time">18:35:12</span>
      </div>

      <div class="client">
        <span class="msg">Подскажите, я проживаю в США и мне не приходит СМС с регистрацией. Что делать? Можете мне код инвдивидуально кинуть, вот мой номер: +8(123)123-123-12</span>
        <span class="time">18:36:48</span>
      </div>

      <div class="client">
        <span class="msg">И возникла ошибка регистрации аккаунта, "System uptime error. 102".</span>
        <span class="time">18:37:03</span>
      </div>

      <div class="client">
            <span class="msg">
              Вот скриншоты ошибок
              <span class="attachment badge badge-light">
                <i class="fas fa-file"></i>
                Screenshot-1
              </span>
              <span class="attachment badge badge-light">
                <i class="fas fa-file"></i>
                Screenshot-2
              </span>
            </span>
        <span class="time">18:37:03</span>
      </div>

    </div>

    <div class="info">
      <div class="systems text-left">
        <p class="msg">Клиент печатает...</p>
      </div>
    </div>
-->
    </div>
    <div class="input">

      <div class="left">
        <div class="pin-file">
          <input type="file" name="file-6[]" id="file-6" class="inputfile inputfile-5" hidden data-multiple-caption="{count} files selected" multiple />
          <label for="file-6"><img src="../../assets/files.svg" alt=""></label>
        </div>

        <div class="smiles">
          <i class="fas fa-smile"></i>
        </div>

        <div class="msg">
          <textarea maxlength="1000" placeholder="Enter your message" v-model="msg"></textarea>
        </div>
      </div>

      <div class="button" @click="submitForm">
        <img src="../../assets/send.svg" alt="">
      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from "axios";
  import VueSocketIO from 'vue-socket.io';
  import SocketIO from 'socket.io-client';
  import store from '../../store';
  import autosize from 'autosize';
  Vue.use(require('vue-moment'));
  import * as jquery from 'jquery'

  export default Vue.extend({
    name: 'ChatBody',
    data () {
      return {
        msg: ""
      }
    },
/*
    sockets: {
      receive: function (msg) {
        console.log("receive2");
        //console.log("msg");
      },
      send: function (data) {
        //this.messages.push({type:"received", body:data, time:Date.now()});
      },
      connected: function (data) {

      }
    },*/
    mounted() {
      Vue.use(new VueSocketIO({
        debug: true,
        connection: SocketIO('http://localhost:3031/', {path:'/socket.io'}),
        vuex: {
          store,
          actionPrefix: 'socket_',
          mutationPrefix: 'socket_'
        },

      }))
      autosize(jquery('.input .msg textarea'));
     },
    updated() {
      jquery(".messages").animate({ scrollTop: 99999 }, "fast");
    },
    methods: {

      submitForm() {
        let sendMessage = {};

        sendMessage.direction = "from_user";
        sendMessage.recepient_id = this.$store.getters.getActiveChatId;
        sendMessage.body = this.msg;
        this.$socket.emit("send", sendMessage);
        this.msg = "";
        autosize(jquery('.input .msg textarea'));
      }
    },
    computed : {
      getId () {
        return this.$store.getters.getActiveChatId;
      },
      messages() {
         if (jquery(".item.selected").length === 0) {
           jquery(".item").first().addClass("selected");
         }

         let f = this.$store.getters.getChats.filter(item => item.sitepower_id == this.getId);
         if (f && f[0] && f[0].messages)
         return f[0].messages;
      }
    }
  })
</script>
