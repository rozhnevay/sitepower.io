<template>
<section id="home">
      <ul id="messages"></ul>
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
      msg: ''
    }
  },
  sockets: {
    receive: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    connected: function (data) {
      localStorage.setItem("sitepower.io.ClientId", data);
    }
  },
  methods: {
    submitForm() {
      this.$socket.emit("send", this.msg);
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
</style>
