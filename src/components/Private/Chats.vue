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
    <div v-if="!isMobile && Object.keys(chats).length > 0" class="main">
      <chat-list-component></chat-list-component>
      <chat-body-component></chat-body-component>
      <chat-info-component></chat-info-component>
    </div>
    <div :class="[ isMobile ?  'main' : '' ]" v-if="Object.keys(chats).length === 0 && status !== 'Loading'">
      <div class="row m-0">
        <div class="col-12 text-center stub">
          <p>Пока у Вас нет ни одного сообщения. Как только у Вас появится активный диалог, он отобразится на этом экране</p>
          <hr>
          <p>А пока, Вы можете отправить сообщение с <a :href="testFormId" target="_blank">тестовой страницы</a>.</p>
          <img src="../../assets/happy.svg" style="max-width: 90%;" alt="">
        </div>
      </div>
    </div>
    <div v-if="isMobile && Object.keys(chats).length > 0" class="main">
        <!--<chat-list-component></chat-list-component>-->
        <component v-bind:is="currentChatComponent"></component>
    </div>
  </div>
</template>

<script>

  import ChatList from '../Private/ChatList';
  import ChatBody from '../Private/ChatBody';
  import ChatInfo from '../Private/ChatInfo';


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
      },
      chats() {
        return this.$store.getters.getChats;
      },
      status() {
        return this.$store.getters.getChatsStatus;
      },
      testFormId() {
        const domain = process.env.NODE_ENV === "production" ? 'https://ws.sitepower.io' : 'http://localhost:3000';
        return domain + '/page/' + this.$store.getters.TEST_FORM_ID;
      },
      currentChatComponent() {
        return this.$store.getters.COMPONENT;
      }

    },
    mounted() {
      const host = process.env.NODE_ENV === "production" ? 'https://ws.sitepower.io' : 'localhost:3000';

      /*
      if (this.$isMobile()) {
        this.$router.push({name: 'ChatList'})
      }*/

      this.$store.dispatch('CHATS_REQUEST', {/*тип запроса*/})
          .then(() => this.$store.dispatch('MESSAGES_REQUEST').then().catch( err => console.log(err.message)))
          .catch(err => {
            alert ("Не удалось получить список диалогов. Попробуйте позже");
            console.log(err.message)
          });

    }
  }
</script>
