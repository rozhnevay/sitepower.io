
<template>
  <div class="left-side">

  <!--        <div class="input-group pr-3 pl-3 mt-2 mb-2">
            <input type="text" class="form-control search" placeholder="Search...">
            <div class="input-group-append">
              <button class="btn btn-white" type="button"><i class="fas fa-search"></i></button>
            </div>
          </div>-->

          <div class="chats overflow-auto" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">


            <div v-for="chat in chats" @click="openChat(chat)" v-bind:id="chat.dialogId" class="item" :class="[ chat.dialogId == activeChatId ?  'selected' : '' ]">

              <div class="left">

                <div class="img">
                  <img src="../../assets/logo-lightning.svg" height="25px" alt="">
                  <span v-if="chat.className" v-bind:id="chat.className" :class="getChatClass(chat)"></span>
                </div>

                <div class="text">
                    <span class="title">
                      {{chat.fullName}}
                    </span>
                  <div class="message">
                      {{chat.lastMessageBody}}
                  </div>
                </div>

              </div>
              <div class="status">
                <!--<span v-if="chat.sitepower_id === activeChatId" class="badge badge-light">NOW </span>-->
                <span v-if="chat.cntUnanswered > 0" class="badge badge-danger" style="width: max-content;">NEW <span  class="badge badge-light" style="padding:inherit">{{chat.cntUnanswered}}</span></span>
                <!--<small class="text-muted">{{chat.lastMessage().created | moment("HH:mm")}}</small>-->
                <!--<small class="text-muted">{{chat.last_msg_created | moment('calendar', null, { sameDay: 'HH:mm', lastDay : 'DD.MM.YYYY HH:mm', lastWeek: 'DD.MM.YYYY HH:mm', sameElse: 'DD.MM.YYYY HH:mm'})}}</small>-->
                <div>
                  <small class="text-muted">{{formatDate(chat.lastMessageCreated)}}</small>
                </div>
              </div>

            </div>

           </div>
        </div>
</template>

<script>

  import infiniteScroll from 'vue-infinite-scroll';
  import moment from 'moment';

  import Vue from 'vue';
  Vue.use(require('vue-moment'));
  export default {
    name: 'Chat',
    data () {
      return {
        busy: false
      }
    },
    methods: {
      openChat(chat) {
        console.log("chat");
        console.log(chat);
        console.log(chat.dialogId);
        this.$store.commit('ACTIVE_CHAT_ID', chat.dialogId);
        this.$root.$emit("chat_open");
        if (this.$isMobile()) {
          // this.$router.push({name: 'ChatBody'})
          this.$store.commit("COMPONENT", 'chat-body-component');
        }
      },
      getChatClass(chat) {
        return "color " + chat.className;
      },
      loadMore() {
        this.busy = true;
        this.$store.dispatch('CHATS_REQUEST', {/*тип запроса*/})
          .then()
          .catch(err => console.log(err.message) /* TODO Заглушка!!!*/);
        this.busy = false;
      },
      formatDate(dat){
        return moment(dat).locale('ru').calendar(null, {
          sameDay: 'Сегодня, HH:mm', lastDay : 'Вчера', lastWeek: 'D MMMM', sameElse: function() {
            if (this.year() === new Date().getFullYear()) {
              return 'D MMMM'
            } else {
              return 'D MMMM YYYY';
            }
          }
        });
      }
    },

    computed: {
      chats() {
        return this.$store.getters.getChats;
      },
      activeChatId() {
        return this.$store.getters.getActiveChatId;
      },
      isMobile: function() {
        return this.$isMobile();
      },
    },
    directives: {infiniteScroll}
  }
</script>
