<template>
  <section id="chat">
        <ul id="messages">
          <li v-for="msg in messages" class="message" v-bind:class="msg.type"><span class="message-time">{{msg.time}}</span>{{msg.body}}</li>
        </ul>
        <form action="">
          <input id="m" autocomplete="off" v-model="msg" /><button v-on:click="submitForm">Send</button>
        </form>
  </section>
 </template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "home-component",
  data () {
    return {
      messages: []
    }
  },
  sockets: {
    receive: function (data) {
      this.messages.push({type:"received", body:data, time:Date.now()});
    },
    connected: function (data) {
      localStorage.setItem("sitepower.io.ClientId", data);
    }
  },
  methods: {
    submitForm() {
      this.$socket.emit("send", this.msg);
      this.messages.push({type:"sended", body:this.msg, time:Date.now()});
      this.msg = "";
    }
  }
});
</script>
<style >
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font: 13px Helvetica, Arial; }
  form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
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
