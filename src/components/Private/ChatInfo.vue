<template>
  <div v-if="getId.length > 0" class="right-side">
    <div  class="top">
      <span class="name">{{chat.fullName}}</span>
      <p class="desc">Дата первого обращения</p>
      <span class="date">{{chat.createdDate | moment("DD.MM.YYYY HH:mm")}}</span>
      <hr>
    </div>
    <div class="overflow-auto">
      <div class="information">
        <span class="title">Информация</span>
        <p class="items" v-if="chat.origin">Канал: {{chat.origin}}</p>
        <p class="items" v-if="chat.region">Регион: {{chat.region}}</p>
        <p class="items" v-if="chat.email">Email: {{chat.email}}</p>
        <p class="items" v-if="chat.phone">Телефон: {{chat.phone}}</p>
        <hr>
      </div>
      <div class="actions">
        <span class="title">Действия</span>
        <div class="buttons">

          <button class="btn btn-blue" data-target="#chatsend" data-toggle="modal" @click="send">Отправить диалог на email</button>
          <button class="btn btn-blue" data-target="#chatinfo" data-toggle="modal" @click="showChatInfoModal">Добавить контакты</button>
<!--          <button class="btn btn-red" @click="setDeleted">Удалить</button>-->
<!--          <button class="btn btn-red" @click="setSpam">В спам!</button>-->
        </div>
      </div>
      <div class="categories">
        <p class="title">Установить категорию</p>
        <div class="colors">
          <div :class="[ chat.className==='white' ? 'active' : '' ]" @click="setClass('white')" class="color color-white"></div>
          <div :class="[ chat.className==='green' ? 'active' : '' ]" @click="setClass('green')" class="color color-green"></div>
          <div :class="[ chat.className==='blue' ? 'active' : '' ]" @click="setClass('blue')" class="color color-blue"></div>
          <div :class="[ chat.className==='red' ? 'active' : '' ]" @click="setClass('red')" class="color color-red"></div>
          <div :class="[ chat.className==='pink' ? 'active' : '' ]" @click="setClass('pink')" class="color color-pink"></div>
          <div :class="[ chat.className==='orange' ? 'active' : '' ]" @click="setClass('orange')" class="color color-orange"></div>
          <div :class="[ chat.className==='purple' ? 'active' : '' ]" @click="setClass('purple')" class="color color-purple"></div>
          <div :class="[ chat.className==='black' ? 'active' : '' ]" @click="setClass('black')" class="color color-black"></div>
        </div>
      </div>
    </div>
    <chat-info-modal-component></chat-info-modal-component>
    <chat-send-component></chat-send-component>
  </div>

</template>

<script>
  import ChatInfoModal from './ModalChatInfo';
  import ChatSendModal from './ModalSend';
  export default {
    name: 'ChatInfo',
    methods :{
      setClass(name){
        this.$store.dispatch('SET_ACTIVE_CHAT_CATEGORY', name).then().catch(err => console.log(err)); /* TODO - заглушка*/
      },
      setSpam() {
        this.$store.dispatch('SET_ACTIVE_CHAT_SPAM', "SPAM").then().catch(err => console.log(err)); /* TODO - заглушка*/
      },
      setDeleted() {
        this.$store.dispatch('SET_ACTIVE_CHAT_SPAM', "DELETED").then().catch(err => console.log(err)); /* TODO - заглушка*/
      },
      send() {
        this.$store.dispatch('ACTIVE_CHAT_SEND').then().catch(err => console.log(err)); /* TODO - заглушка*/
      },
      showChatInfoModal () {
        this.$root.$emit("chatinfo_open", this.chat);

      }


    },
    computed : {
      getId () {
        return this.$store.getters.getActiveChatId;
      },
      chat () {
        const chatId = this.$store.getters.getActiveChatId;
        return this.$store.getters.getChats.filter(item => item.dialogId === chatId)[0];
      }
    },
    components : {
      'chat-send-component' : ChatSendModal,
      'chat-info-modal-component' : ChatInfoModal
    }
  }
</script>
