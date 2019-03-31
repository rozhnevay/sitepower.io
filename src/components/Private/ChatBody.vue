<template>
  <div class="col-md-8 col-xl-6 chat-body">
    <div class="card">
      <span>{{getId}}</span>
      <ul id="messages">
        <li v-for="msg in messages" class="message" v-bind:class="[ msg.direction ? 'to-user' : 'received', 'sended' ]"><span class="message-time">{{msg.time | moment("HH:mm")}}</span>{{msg.body}}</li>
      </ul>
      <form action="">
        <input id="m" autocomplete="off" v-model="msg.body" /><button v-on:click.prevent="submitForm">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from "axios";
  import VueSocketIO from 'vue-socket.io';


  Vue.use(require('vue-moment'));
  Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000'
  }))

  export default Vue.extend({
    name: 'ChatBody',
    data () {
      return {
        messages: [],
        msg: {}
      }
    },
    props:['id'],
    sockets: {
      receive: function (msg) {
        this.messages.push(msg);
      },
      send: function (data) {
        //this.messages.push({type:"received", body:data, time:Date.now()});
      },
      connected: function (data) {

      }
    },
    mounted() {
      this.getMessages();
    },
    methods: {
      getMessages() {
        if (!this.id) return;
        axios.get("/api/chat/"+this.id).then((res) => {
          console.log(res.data);
          this.messages = res.data.chat.messages;
        }).catch((err) => {
        })
      },
      submitForm() {
        this.msg.direction = "from_user";
        this.msg.recepient_id = this.id;
        this.$socket.emit("send", this.msg);
        this.messages.push({type:"sended", body:this.msg, time:Date.now()});
        this.msg = "";
      }
    },
    computed : {
      getId () {
        console.log(this.id);
        this.getMessages();
        return this.id;
      }
    }
  })
</script>

<style scoped>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font: 13px Helvetica, Arial; }
  form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 60%; }
  form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; color: black; }
  form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
  #messages { list-style-type: none; margin: 0; padding: 0; }
  #messages li { padding: 5px 10px; }
  #messages li:nth-child(odd) { background: #eee; }

  .message.sended {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 25px;
    background-color: #78e08f;
    padding: 10px;
    position: relative;
    display: block;
  }
  .message.received {
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
