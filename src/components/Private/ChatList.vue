
<template>
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
                <!--<small class="text-muted">{{chat.last_msg_created | moment('calendar', null, { sameDay: 'HH:mm', lastDay : 'DD.MM.YYYY HH:mm', lastWeek: 'DD.MM.YYYY HH:mm', sameElse: 'DD.MM.YYYY HH:mm'})}}</small>-->
                <small class="text-muted">{{chat.last_msg_created | moment('calendar', null, { sameDay: 'HH:mm', lastDay : 'DD.MM.YYYY', lastWeek: 'DD.MM.YYYY', sameElse: 'DD.MM.YYYY'})}}</small>
              </div>
            </div>

           </div>
        </div>
</template>

<script>



  import Vue from 'vue';
  Vue.use(require('vue-moment'));
  import moment from 'moment';
  export default {
    name: 'Chat',
    mounted() {
      this.$store.dispatch('CHATS_REQUEST', {/*тип запроса*/})
        .then(() => this.$store.dispatch('MESSAGES_REQUEST').then().catch( err => console.log(err.message)))
        .catch(err => console.log(err.message) /* TODO Заглушка!!!*/);

    },
    methods: {
      openChat(chat) {
        this.$store.commit('ACTIVE_CHAT_ID', chat.sitepower_id);
        this.$root.$emit("chat_open");
        if (this.$isMobile()) {
          this.$router.push({name: 'ChatBody'})
        }
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
    }
  }
</script>
