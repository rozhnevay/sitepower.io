
<template>

  <div class="main">
    <div class="mobile-message">
      <div class="alert alert-warning m-0" role="alert">
        Мы заметили что вы с телефона, перезагрузите страницу для корректного отображения
      </div>
    </div>
    <div class="left-side">

        <div class="input-group pr-3 pl-3 mt-2 mb-2">
          <input type="text" class="form-control search" placeholder="Search...">
          <div class="input-group-append">
            <button class="btn btn-white" type="button"><i class="fas fa-search"></i></button>
          </div>
        </div>

        <div class="chats overflow-auto">


          <div v-for="chat in chats" @click="openChat" v-bind:id="chat.sitepower_id" class="item">

            <div class="left">

              <div class="img">
                <img src="../../assets/logo-lightning.svg" height="25px" alt="">
                <span class="color" v-if="chat.class" v-bind:id=chat.class></span>
              </div>

              <div class="text">
                  <span class="title">
                    {{chat.name}}
                  </span>
                <div class="message">
                    {{chat.lastMessage().body}}
                </div>
              </div>

            </div>


            <div class="status">
              <!--<span v-if="chat.sitepower_id === activeChatId" class="badge badge-light">NOW </span>-->
              <span v-if="chat.countUnread() > 0" class="badge badge-danger">UNREAD <span  class="badge badge-light">{{chat.countUnread()}}</span></span>
              <small class="text-muted">{{chat.lastMessage().created | moment("HH:mm")}}</small>
            </div>
          </div>

         </div>
      </div>
    <chat-body-component :id="activeChatId"></chat-body-component>
    <chat-info-component :id="activeChatId"></chat-info-component>
  </div>
</template>

<script>
  /*<div class="d-flex bd-highlight" @click="openChat(chat)" v-bind:class="[ activeChat.id == chat.id ? 'active' : 'inactive']">*/
  import axios from "axios";
  import ChatBody from '../Private/ChatBody';
  import ChatInfo from '../Private/ChatInfo';
  import 'jquery';
  import * as jquery from 'jquery'
  import Vue from 'vue';
  Vue.use(require('vue-moment'));
  import moment from 'moment';
  export default {
    name: 'Chat',
    data () {
      return {
        //activeChat: {status : "inactive", id: "", messages : []}
      }
    },
    mounted() {
      axios.get("/api/chats").then((res) => {
        let chats = res.data;

        chats.map(item => {
          item.lastMessage = () => {
            if (item.messages && item.messages.length) {
              return item.messages[item.messages.length - 1];
            }
            return {};
          };
          item.countUnread = () => {
            console.log("countUnread");
            if (item.messages && item.messages.length) {
              let unread = item.messages.filter(u => moment(u.created) > moment(item.lastOpenDt))
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
          if (moment(alastMC) < moment(blastMC)) return -1
          else if (moment(alastMC) > moment(blastMC)) return 1
          else return 0
        });
        console.log(chats);
        this.$store.commit('initChats', chats);
      }).catch((err) => {
        console.log("Error in getting chats: ", err.message)
      })

    },
    methods: {
      openChat(e) {
        //this.chats.map(item => item.status = (item.id != chat.id) ? "inactive" : "active");
        jquery(".item").removeClass("selected");
        jquery(e.target).closest(".item").addClass("selected");

        this.$store.commit('setActiveChatId', jquery(e.target).closest(".item").attr('id'));
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
