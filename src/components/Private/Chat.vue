
<template>

  <div class="main">
    <!--<div class="mobile-message">-->
      <!--<div class="alert alert-warning m-0" role="alert">-->
        <!--Мы заметили что вы с телефона, перезагрузите страницу для корректного отображения-->
      <!--</div>-->
    <!--</div>-->
    <div class="left-side">

<!--        <div class="input-group pr-3 pl-3 mt-2 mb-2">
          <input type="text" class="form-control search" placeholder="Search...">
          <div class="input-group-append">
            <button class="btn btn-white" type="button"><i class="fas fa-search"></i></button>
          </div>
        </div>-->

        <div class="chats overflow-auto">


          <div v-for="chat in chats" @click="openChat(chat)" v-bind:id="chat.sitepower_id" class="item" :class="[ chat.sitepower_id == activeChatId ?  'selected' : '' ]">

            <div class="left">

              <div class="img">
                <img src="../../assets/logo-lightning.svg" height="25px" alt="">
                <span v-if="chat.class" v-bind:id="chat.class" :class="getChatClass(chat)"></span>
              </div>

              <div class="text">
                  <span class="title">
                    {{chat.name}}
                  </span>
                <div class="message">
                    {{chat.last_msg_body}}
                </div>
              </div>

            </div>
            <div class="status">
              <!--<span v-if="chat.sitepower_id === activeChatId" class="badge badge-light">NOW </span>-->
              <span v-if="chat.cnt_unanswered > 0" class="badge badge-danger">UNREAD <span  class="badge badge-light">{{chat.cnt_unanswered}}</span></span>
              <!--<small class="text-muted">{{chat.lastMessage().created | moment("HH:mm")}}</small>-->
              <small class="text-muted">{{chat.last_msg_created | moment('calendar', null, { sameDay: 'HH:mm', lastDay : 'DD.MM.YYYY HH:mm', lastWeek: 'DD.MM.YYYY HH:mm', sameElse: 'DD.MM.YYYY HH:mm'})}}</small>
            </div>
          </div>

         </div>
      </div>
    <chat-body-component :id="activeChatId"></chat-body-component>
    <chat-info-component :id="activeChatId"></chat-info-component>
  </div>
</template>

<script>
  import axios from "axios";
  import ChatBody from '../Private/ChatBody';
  import ChatInfo from '../Private/ChatInfo';

  import Vue from 'vue';
  Vue.use(require('vue-moment'));
  import moment from 'moment';
  export default {
    name: 'Chat',
    mounted() {
      this.$store.dispatch('CHATS_REQUEST', {/*тип запроса*/});

      /* axios.get("/api/chats").then((res) => {
        let chats = res.data;

        chats.map(item => {
          item.lastMessage = () => {
            if (item.messages && item.messages.length) {
              return item.messages[item.messages.length - 1];
            }
            return {};
          };
          item.countUnread = () => {
            if (item.messages && item.messages.length) {
              let unread = item.messages.filter(u => moment(u.created) > moment(item.lastOpenDt) && u.direction === "to_user")
              if (unread && unread.length > 0) {
                return unread.length;
              }
            }
            return 0;
          }
        });
        chats.sort((a,b)=> {
          let alastMC = a.lastMessage().created;
          let blastMC = b.lastMessage().created;
          if (moment(alastMC) < moment(blastMC)) return 1
          else if (moment(alastMC) > moment(blastMC)) return -1
          else return 0
        });
        this.$store.commit('initChats', chats);
      }).catch((err) => {
        console.log("Error in getting chats: ", err.message)
      })
*/
    },
    methods: {
      openChat(chat) {
        this.$store.commit('setActiveChatId', chat.sitepower_id);
        this.$root.$emit("chat_open");
      },
      getChatClass(chat) {
        return "color " + chat.class;
      }
    },
    computed: {
      chats() {
        return this.$store.getters.getChats;
      },
      activeChatId() {
        return this.$store.getters.getActiveChatId;
      }
    },
    components: {
      'chat-body-component': ChatBody,
      'chat-info-component': ChatInfo
    }
  }
</script>
