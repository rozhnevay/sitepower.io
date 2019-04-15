<template>
  <div class="chat">
    <div class="messages overflow-auto">
      <!--<div class="systems">-->
        <!--<p class="msg">Клиент открыл чат</p>-->
        <!--<span class="time">18:30:14</span>-->
      <!--</div>-->

      <div v-for="(msg, index) in messages" >
        <div v-if="needNewSeparator(msg, index)" class="new-msg-separator">
          New Messages
        </div>
        <div :class="[ msg.direction == 'from_user' ?  'admin' : 'client' ]">
          <span v-if="msg.direction == 'to_user' && msg.link==''" class="msg">{{msg.body}}</span>
          <span class="time">{{msg.created | moment("HH:mm:ss")}}</span>
          <!--<span class="time">{{msg.created |moment('calendar', null, { sameDay: 'HH:mm:ss',  lastWeek: 'DD.MM HH:mm:ss', sameElse: 'DD.MM HH:mm:ss'})}}</span>-->

          <span v-if="msg.direction == 'from_user' && msg.type=='text'" class="msg">{{msg.body}}</span>
          <a v-if="msg.direction == 'from_user' && msg.type=='link'" class="msg" :href="msg.link"><span  class="attachment badge badge-light"><i class="fas fa-file"></i>{{msg.body}}</span></a>

        </div>

      </div>
      <div  class="info"><div class="systems text-left">
        <p v-if="printingFlag == 'Y'" class="msg">Клиент печатает...</p>
        <p v-else class="msg" style="color:transparent">Waiting for a message</p>
      </div></div>





    </div>
    <div class="input">

      <div class="left">
        <div class="pin-file">
          <input type="file" name="file[]" id="file" ref="file" v-on:change="handleFileUpload()" class="inputfile inputfile-5" hidden data-multiple-caption="{count} files selected" multiple />
          <label for="file"><img src="../../assets/files.svg" alt=""></label>
        </div>

<!--
        <div class="smiles">
          <i class="fas fa-smile" data-emojiable="true"></i>
        </div>
-->
        <emoji-picker @emoji="append" :emojiTable="getCustomEmo">
          <div
            class="smiles fas fa-smile"
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
          >
          </div>
          <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
            <div class="emoji-picker" :style="{ top: -18 + 'rem', left: 0 + 'rem' }">
              <div>
                <div v-for="(emojiGroup, category) in emojis" :key="category">
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
  import customEmo from '../../js/custom-emo';
  import moment from 'moment';


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
      let self = this;
      setInterval(() => {
        console.log("dff");
        if (moment(self.$store.getters.getActiveChatPrintingTm).add(moment.duration(1, 'seconds')) < moment()){
          self.$store.commit("setActiveChatPrintingTm","");
        }
      }, 1000)
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
        sendMessage.type = "text";
        this.$socket.emit("send", sendMessage);
        this.msg = "";
        autosize(jquery('.input .msg textarea'));
      },
      append(emoji) {
        this.msg += emoji
        this.$el.querySelector(".input").click();
      },
      needNewSeparator(msg, index){
        if (msg.direction === "to_user" && moment(msg.created) > moment(this.getChatOpenDt)){
          if(this.messages[index-1] && moment(this.messages[index-1].created) <= moment(this.getChatOpenDt)) {
            return true;
          }
        }
        return false;
      },

      handleFileUpload() {
        let files = this.$refs.file.files;
        for (var i = 0, n = files.length; i < n; i++){
          let file = files[i];

          // выставляем крутилку на скрепку
          let formData = new FormData();
          formData.append('file', file);
          formData.append('filename', file.name);
          axios.post("/api/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
            let sendMessage = {};

            sendMessage.direction = "from_user";
            sendMessage.recepient_id = this.$store.getters.getActiveChatId;
            sendMessage.body = file.name;
            sendMessage.type = "link";
            sendMessage.link = res.data;
            this.$socket.emit("send", sendMessage);

          }).catch(err => console.log(err.message))



        }
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
      },
      getChatOpenDt () {
        let chat = this.$store.getters.getChats.filter(item => item.sitepower_id == this.getId)
        if (chat && chat[0]) {
          return chat[0].lastOpenDt;
        }
        return null;
      },
      getCustomEmo () {
        return customEmo;
      },
      printingFlag(){
        if (moment(this.$store.getters.getActiveChatPrintingTm).add(moment.duration(1, 'seconds')) > moment()){
          return "Y";
        }
        return "N";
      },
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        },
      },
     },
    components: {
      'emoji-picker' : EmojiPicker
    }
  })
</script>
<style scoped>

  .left {
    position: relative;
    display: inline-block;
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
    overflow-y: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
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
