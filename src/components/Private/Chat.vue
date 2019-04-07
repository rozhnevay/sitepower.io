
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
          <div class="item selected">

            <div class="left">

              <div class="img">
                <img src="../../assets/logo-lightning.svg" height="25px" alt="">
                <span class="color red"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-light">NEW</span>
            </div>
          </div>

          <div class="item">

            <div class="left">

              <div class="img">
                <img src="assets/img/logo-lightning.svg" height="25px" alt="">
                <span class="color green"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-success">ANSWERED</span>
            </div>
          </div>

          <div class="item">

            <div class="left">

              <div class="img">
                <img src="assets/img/logo-lightning.svg" height="25px" alt="">
                <span class="color purple"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-danger">UNREAD <span class="badge badge-light">5</span></span>
            </div>
          </div>

          <div class="item">

            <div class="left">

              <div class="img">
                <img src="assets/img/logo-lightning.svg" height="25px" alt="">
                <span class="color purple"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-danger">UNREAD <span class="badge badge-light">5</span></span>
            </div>
          </div>

          <div class="item">

            <div class="left">

              <div class="img">
                <img src="assets/img/logo-lightning.svg" height="25px" alt="">
                <span class="color purple"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-danger">UNREAD <span class="badge badge-light">5</span></span>
            </div>
          </div>

          <div class="item">

            <div class="left">

              <div class="img">
                <img src="assets/img/logo-lightning.svg" height="25px" alt="">
                <span class="color purple"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-danger">UNREAD <span class="badge badge-light">5</span></span>
            </div>
          </div>

          <div class="item">

            <div class="left">

              <div class="img">
                <img src="assets/img/logo-lightning.svg" height="25px" alt="">
                <span class="color purple"></span>
              </div>

              <div class="text">
                  <span class="title">
                    Hosters.ru
                  </span>
                <div class="message">
                  Спасибо большое за ответ…
                </div>
              </div>

            </div>


            <div class="status">
              <span class="badge badge-danger">UNREAD <span class="badge badge-light">5</span></span>
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
  export default {
    name: 'Chat',
    data () {
      return {
        //activeChat: {status : "inactive", id: "", messages : []}
      }
    },
    mounted() {
      axios.get("/api/chats").then((res) => {
        this.$store.commit('initChats', res.data);
      }).catch((err) => {
        console.log("Error in getting chats: ", err.message)
      })

    },
    methods: {
      openChat(chat) {
        this.chats.map(item => item.status = (item.id != chat.id) ? "inactive" : "active");
        this.$store.commit('setActiveChatId', chat.sitepower_id);
      },
      /*getMessages() {
        axios.get("/api/chat/" + this.activeChat.id).then((res) => {
          this.activeChat.messages = res.data.chat.messages;
          console.log(this.activeChat.messages);
        }).catch((err) => {
        })
      }*/
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
