<template>
  <div class="chat">
    <div class="messages overflow-auto">
      <!--<div class="systems">-->
        <!--<p class="msg">Клиент открыл чат</p>-->
        <!--<span class="time">18:30:14</span>-->
      <!--</div>-->

      <div v-for="msg in messages" :class="[ msg.direction == 'from_user' ?  'admin' : 'client' ]">
        <span v-if="msg.direction == 'to_user'" class="msg">{{msg.body}}</span>
        <span class="time">{{msg.created | moment("HH:mm:ss")}}</span>
        <span v-if="msg.direction == 'from_user'" class="msg">{{msg.body}}</span>
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

<!--
        <div class="smiles">
          <i class="fas fa-smile" data-emojiable="true"></i>
        </div>
-->
        <emoji-picker @emoji="append" :search="search">
          <div
            class="smiles fas fa-smile"
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
            v-on="events"
          >
          </div>
          <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
            <div class="emoji-picker" :style="{ top: -18 + 'rem', left: 0 + 'rem' }">
              <div>
                <div v-for="(emojiGroup, category) in emojis" :key="category">
                  <h5>{{ category }}</h5>
                  <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </emoji-picker>
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
  import EmojiPicker from 'vue-emoji-picker'


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
      },
      append(emoji) {
        this.msg += emoji
      },
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
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        },
      },
     },
    components: {
      'emoji-picker' : EmojiPicker,
    }
  })
</script>
<style scoped>
  .left {
    position: relative;
    display: inline-block;
  }
  .emoji-invoker {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }
  .emoji-invoker:hover {
    transform: scale(1.1);
  }
  .emoji-invoker > svg {
    fill: #b1c6d0;
  }

  .emoji-picker {
    position: absolute;
    z-index: 1;
    font-family: Montserrat;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    overflow: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
  }
  .emoji-picker__search {
    display: flex;
  }
  .emoji-picker__search > input {
    flex: 1;
    border-radius: 10rem;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    outline: none;
  }
  .emoji-picker h5 {
    margin-bottom: 0;
    color: #b1b1b1;
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: default;
  }
  .emoji-picker .emojis {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .emoji-picker .emojis:after {
    content: "";
    flex: auto;
  }
  .emoji-picker .emojis span {
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
  }
  .emoji-picker .emojis span:hover {
    background: #ececec;
    cursor: pointer;
  }
</style>
