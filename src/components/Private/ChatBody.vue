<template>
  <div class="col-md-8 col-xl-6 chat-body">
    <div class="card">
      <span>Chat with {{getId}}</span>
      <ul id="messages">
        <li v-for="msg in messages" class="message" v-bind:class="msg.direction">{{msg.body}}</li>
      </ul>
      <form action="">
        <input id="m" autocomplete="off" v-model="msg" /><button v-on:click.prevent="submitForm">Send</button>
      </form>
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
  Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('/', {path:'/socket.io'}),
    vuex: {
      store,
      actionPrefix: 'socket_',
      mutationPrefix: 'socket_'
    },

  }))

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

