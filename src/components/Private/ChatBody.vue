<template>
  <div class="chat">
    <div class="messages overflow-auto">
      <div class="systems">
        <p class="msg">Клиент открыл чат</p>
        <span class="time">18:30:14</span>
      </div>

      <div class="client">
        <span class="msg">Здравствуйте, помогите мне с регистрацией</span>
        <span class="time">18:31:05</span>
      </div>

      <div class="admin">
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
          <input type="text" placeholder="Enter your message">
        </div>
      </div>

      <div class="button">
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
  Vue.use(require('vue-moment'));


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
    },
    methods: {

      submitForm() {
        let sendMessage = {};

        sendMessage.direction = "from_user";
        sendMessage.recepient_id = this.$store.getters.getActiveChatId;
        sendMessage.body = this.msg;
        this.$socket.emit("send", sendMessage);
        this.msg = "";
        //this.messages.push({direction:"from_user", body:this.msg, time:Date.now()});

      }
    },
    computed : {
      getId () {
        return this.$store.getters.getActiveChatId;
      },
      messages() {
         return this.$store.getters.getActiveChatMessages;
      }
    }
  })
</script>

<style scoped>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font: 13px Helvetica, Arial; }
  form { background: #000; padding: 3px; position: absolute; bottom: 0; width: 100%; }
  form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; color: black; }
  form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
  #messages { list-style-type: none; margin: 0; padding: 0; }
  #messages li { padding: 5px 10px; margin-top: 2px;}
  .card {
    padding : 10px
  }

  .message.from_user {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 25px;
    background-color: #78e08f;
    padding: 10px;
    position: relative;
    display: block;
  }
  .message.to_user {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 25px;
    background-color: #82ccdd;
    padding: 10px;
    position: relative;
    display: block;
  }
  .message-time {
    position: absolute;
    left: 0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
  }
</style>

