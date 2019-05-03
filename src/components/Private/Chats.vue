<template>
  <div>
    <!--<div v-if="isMobile" class="mobile-message">-->
      <!--<div class="alert alert-warning m-0" role="alert">Мы заметили что вы с телефона, перезагрузите страницу для корректного отображения</div>-->
    <!--</div>-->
    <!--<div class="under-header">-->
      <!--<ul class="nav nav-custom nav-pills" id="pills-tab" role="tablist">-->
        <!--<li class="nav-item">-->
          <!--<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"><i class="fas fa-comments mr-1"></i> Мои диалоги <span class="color"></span></a>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
          <!--<a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"><i class="fas fa-comment-dots mr-1"></i> Очередь <span class="color"></span></a>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
          <!--<a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"><i class="fas fa-comment mr-1"></i> Все диалоги</a>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <div v-if="!isMobile" class="main">
      <chat-list-component></chat-list-component>
      <chat-body-component></chat-body-component>
      <chat-info-component></chat-info-component>
    </div>
    <div v-else class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import ChatList from '../Private/ChatList';
  import ChatBody from '../Private/ChatBody';
  import ChatInfo from '../Private/ChatInfo';
  import VueSocketIO from 'vue-socket.io';
  import SocketIO from 'socket.io-client';
  import store from '../../store';

  export default {
    name: 'Chats',
    components: {
      'chat-list-component': ChatList,
      'chat-body-component': ChatBody,
      'chat-info-component': ChatInfo
    },
    computed: {
      isMobile: function() {
        return this.$isMobile();
      }
    },
    mounted() {
      Vue.use(new VueSocketIO({
        debug: true,
        connection: SocketIO(':3031/', {path:'/socket.io'}),
        vuex: {
          store,
          actionPrefix: 'socket_',
          mutationPrefix: 'socket_'
        },
      }))
      if (this.$isMobile()) {
        this.$router.push({name: 'ChatList'})
      }
    }
  }
</script>
