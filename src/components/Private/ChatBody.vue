<template>
    <div class="chat">
    <div class="messages overflow-auto" id="messages">
      <!--<div class="systems">-->
        <!--<p class="msg">Клиент открыл чат</p>-->
        <!--<span class="time">18:30:14</span>-->
      <!--</div>-->

      <div v-for="(msg, index) in messages" >
        <div v-if="needNewSeparator(msg, index)" class="new-msg-separator">
          Неотвеченные сообщения
        </div>
        <div v-if="dateSeparator(msg, index)" class="new-msg-separator">
          {{dateSeparator(msg, index)}}
        </div>
        <div v-if="ownerSeparator(msg, index)" style="margin-top:20px;">
          <span class="text-muted" :style="msg.direction === 'from_user' ? 'padding-left: 65px;' : ''">{{ownerSeparator(msg, index)}}</span>
        </div>
        <div :class="[ msg.direction === 'from_user' ?  'admin' : 'client' ]">

          <span v-if="msg.direction === 'to_user' && (msg.link===null || msg.link==='')" class="msg">{{msg.body}}</span>
          <a v-if="msg.type==='link' && msg.direction === 'to_user'" class="msg" :href="msg.link" target="_blank"><span><i class="fas fa-file"></i> {{msg.body}}</span></a>
          <div class="time">{{msg.createdDate | moment("HH:mm:ss")}}</div>
          <!--<span class="time">{{msg.created |moment('calendar', null, { sameDay: 'HH:mm:ss',  lastWeek: 'DD.MM HH:mm:ss', sameElse: 'DD.MM HH:mm:ss'})}}</span>-->

          <span v-if="msg.direction === 'from_user' && msg.type==='text'" class="msg">{{msg.body}}</span>
          <a v-if="msg.type==='link' && msg.direction === 'from_user'" class="msg" :href="msg.link" target="_blank"><span><i class="fas fa-file"></i> {{msg.body}}</span></a>

        </div>

      </div>
      <div  class="info"><div class="systems text-left">
        <p v-if="printingFlag == 'Y'" class="msg">{{nameUserPrint}} печатает...</p>
        <p v-else class="msg" style="color:transparent">Waiting for a message</p>
      </div></div>
    </div>
    <div class="input">

      <div class="left">
<!--        <div class="pin-file" title="Прикрепить вложение" v-if="chat.type==='site'">-->
<!--          <input type="file" name="file[]" id="file" ref="file" v-on:change="handleFileUpload()" class="inputfile inputfile-5" hidden data-multiple-caption="{count} files selected" multiple />-->
<!--          <label for="file"><img src="../../assets/files.svg" alt=""></label>-->
<!--        </div>-->
<!--        <emoji-picker @emoji="append" :emojiTable="getCustomEmo">-->
<!--          <div-->
<!--            class="smiles fas fa-smile"-->
<!--            slot="emoji-invoker"-->
<!--            slot-scope="{ events: { click: clickEvent } }"-->
<!--            @click.stop="clickEvent"-->
<!--          >-->
<!--          </div>-->
<!--          <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">-->
<!--            <div class="emoji-picker" :style="{ top: -18 + 'rem', left: 0 + 'rem' }">-->
<!--              <div>-->
<!--                <div v-for="(emojiGroup, category) in emojis" :key="category">-->
<!--                  <div class="emojis">-->
<!--                <span-->
<!--                  v-for="(emoji, emojiName) in emojiGroup"-->
<!--                  :key="emojiName"-->
<!--                  @click="insert(emoji)"-->
<!--                  :title="emojiName"-->
<!--                >{{ emoji }}</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </emoji-picker>-->
        <div class="msg">
          <textarea maxlength="1000" placeholder="Введите сообщение..." v-model="msg" ></textarea>
        </div>
      </div>

      <div class="button" @click="submitForm" title="Отправить сообщение">
        <img src="../../assets/send.svg" alt="">
      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from "axios";


  import autosize from 'autosize';
  Vue.use(require('vue-moment'));
  import * as $ from 'jquery'
  import EmojiPicker from 'vue-emoji-picker'
  import customEmo from '../../js/custom-emo';
  import moment from 'moment';


  export default Vue.extend({
    name: 'ChatBody',
    data () {
      return {
        msg: "",
        nameUserPrint : ""
      }
    },
    mounted() {
      let that = this;
      this.$root.$on('chat_open', function () {
        this.$store.dispatch('MESSAGES_REQUEST', {/*тип запроса*/});
      });

      autosize($('.input .msg textarea'));
      let self = this;
      setInterval(() => {
        if (moment(self.$store.getters.getActiveChatPrintingTm).add(moment.duration(1, 'seconds')) < moment()){
          self.$store.commit("setActiveChatPrintingTm","");
        }
      }, 1000)

      $(".msg textarea").on("keydown", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          that.submitForm();
          return;
        }
        if (/[а-яА-Яa-zA-Z0-9-_ ]/.test(String.fromCharCode(event.keyCode))) {
          var msg = {};
          msg.body = "";
          msg.type = "print";
          msg.link = "";
          msg.chat_id = that.$store.getters.getActiveChatId;
          msg.operator_name = that.$store.getters.USER_NAME;
          that.$socket.emit("print", msg);
        }
      });
      /*для скроллинга*/
      $(".messages").scrollTop($(".messages").prop("scrollHeight"));
      if (this.$isMobile) {
        $('html,body').animate({
          scrollTop: 9999
        }, 0, function(){
          $('html,body').clearQueue();
        });
      }

     },
    updated() {
      if ($(".messages").scrollTop !== $(".messages").prop("scrollHeight")){
        $(".messages").scrollTop($(".messages").prop("scrollHeight"));
      }

      if (this.$isMobile) {
        $('html,body').animate({
          scrollTop: 9999
        }, 0, function(){
          $('html,body').clearQueue();
        });
      }

    },
    // watch: {
    //   messages() {
    //     $(".messages").scrollTop($(".messages").prop("scrollHeight"));
    //     if (this.$isMobile) {
    //       $('html,body').animate({
    //         scrollTop: 9999
    //       }, 0, function(){
    //         $('html,body').clearQueue();
    //       });
    //     }
    //   }
    // },
    methods: {

      ownerSeparator(msg, index){
        const prevMsg = this.messages[index-1]

        let prevMsgOwner;
        if (!prevMsg) prevMsgOwner = "NONE";
        else if (prevMsg.operator_name) prevMsgOwner = prevMsg.operator_id === this.$store.getters.USER_ID ? "Вы" : prevMsg.operator_name;
        else prevMsgOwner = "Посетитель";
        const msgOwner = msg.operator_name ? msg.operator_id === this.$store.getters.USER_ID ? "Вы" : msg.operator_name : "Посетитель";
        if (msgOwner !== prevMsgOwner) return msgOwner;

        return null;
      },
      submitForm() {
        if (!this.msg) return;
        let sendMessage = {};

        sendMessage.direction = "from_user";
        sendMessage.recepientId = this.$store.getters.getActiveChatId;
        sendMessage.body = this.msg;
        sendMessage.type = "text";
        this.$socket.emit("send_user", sendMessage);
        this.msg = "";
        autosize($('.input .msg textarea'));
      },
      append(emoji) {
        this.msg += emoji
        this.$el.querySelector(".input").click();
      },
      needNewSeparator(msg, index){
        let userMessages = this.messages.filter(item => item.direction === "from_user")
        let lastUserMsgId = userMessages[userMessages.length - 1] ? userMessages[userMessages.length - 1].id : 999999999;

        if (msg.direction === "to_user" && parseInt(msg.id, 10) > parseInt(lastUserMsgId, 10)){
          if(this.messages[index-1] && this.messages[index-1].id === lastUserMsgId) {
            return true;
          }
        }
        return false;
      },
      dateSeparator(msg, index){
        const prevMsg = this.messages[index-1]
        const prevMsgDate = prevMsg ? moment(prevMsg.created, "YYYYMMDD") : moment("1970-01-01")
        const msgDate = moment(msg.created, "YYYYMMDD")
        if (msgDate > prevMsgDate){
          return moment(msg.created).locale('ru').calendar(null, {
            sameDay: 'Сегодня', lastDay : 'Вчера', lastWeek: 'D MMMM', sameElse: function() {
              if (this.year() === new Date().getFullYear()) {
                return 'D MMMM'
              } else {
                return 'D MMMM YYYY';
              }
            }
          });
        }
        return;
      },
      handleFileUpload() {
        let files = this.$refs.file.files;
        for (var i = 0, n = files.length; i < n; i++){
          let file = files[i];
          // выставляем крутилку на скрепку
          let formData = new FormData();
          console.log("file");
          console.log(file);
          formData.append('file', file);
          formData.append('filename', file.name);
          axios.post("/api/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
            let sendMessage = {};

            sendMessage.direction = "from_user";
            sendMessage.recepient_id = this.$store.getters.getActiveChatId;
            sendMessage.body = res.data.file;
            sendMessage.type = "link";
            sendMessage.link = res.data.url;
            this.$socket.emit("send", sendMessage);

          }).catch(err => console.log(err.message))



        }
        this.$refs.file.value = '';
      }
    },
    computed : {
      getId () {
        return this.$store.getters.getActiveChatId;
      },
      messages() {
         return this.$store.getters.getMessages;
      },
      getChatOpenDt () {
        let chat = chat()
        if (chat && chat[0]) {
          return chat[0].lastOpenDt;
        }
        return null;
      },
      chat () {
        console.log(this.$store.getters.getChats)
        return this.$store.getters.getChats.filter(item => item.dialogId === this.getId)[0];
      },
      getCustomEmo () {
        return customEmo;
      },
      printingFlag(){
        if (moment(this.$store.getters.getActiveChatPrintingTm).add(moment.duration(1, 'seconds')) > moment()){
          this.nameUserPrint = this.$store.getters.getActiveChatPrintingName;
          return "Y";
        }
        return "N";
      },
      isMobile: function() {
        return this.$isMobile();
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
