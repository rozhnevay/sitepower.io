<template>
  <div v-if="getId.length > 0" class="right-side">
    <div  class="top">
      <span class="name">{{chat.name}}</span>
      <p class="desc">Дата первого обращения</p>
      <span class="date">{{chat.created | moment("DD.MM.YYYY HH:mm")}}</span>
      <hr>
    </div>
    <div class="overflow-auto">
      <div class="information">
        <span class="title">Информация</span>
        <!--<p class="items">Region: Moscow</p>-->
        <p class="items" v-if="chat.login">Email: {{chat.login}}</p>
        <p class="items" v-if="chat.phone">Телефон: {{chat.phone}}</p>
        <hr>
      </div>
      <div class="actions">
        <span class="title">Действия</span>
        <div class="buttons">

          <button class="btn btn-blue">Отправить диалог на email</button>
          <button class="btn btn-blue" data-target="#chatinfo" data-toggle="modal" @click="showChatInfoModal">Добавить контакты</button>
          <button class="btn btn-red" @click="setSpam">В спам!</button>
        </div>
      </div>
      <div class="categories">
        <p class="title">Установить категорию</p>
        <div class="colors">
          <div :class="[ chat.class==='white' ? 'active' : '' ]" @click="setClass('white')" class="color color-white"></div>
          <div :class="[ chat.class==='green' ? 'active' : '' ]" @click="setClass('green')" class="color color-green"></div>
          <div :class="[ chat.class==='blue' ? 'active' : '' ]" @click="setClass('blue')" class="color color-blue"></div>
          <div :class="[ chat.class==='red' ? 'active' : '' ]" @click="setClass('red')" class="color color-red"></div>
          <div :class="[ chat.class==='pink' ? 'active' : '' ]" @click="setClass('pink')" class="color color-pink"></div>
          <div :class="[ chat.class==='orange' ? 'active' : '' ]" @click="setClass('orange')" class="color color-orange"></div>
          <div :class="[ chat.class==='purple' ? 'active' : '' ]" @click="setClass('purple')" class="color color-purple"></div>
          <div :class="[ chat.class==='black' ? 'active' : '' ]" @click="setClass('black')" class="color color-black"></div>
        </div>
      </div>
    </div>
    <chat-info-modal-component></chat-info-modal-component>
  </div>

</template>

<script>
  import ChatInfoModal from './ModalChatInfo';
  export default {
    name: 'ChatInfo',
    methods :{
      setClass(name){
        this.$store.dispatch('SET_ACTIVE_CHAT_CATEGORY', name).then().catch(err => console.log(err)); /* TODO - заглушка*/
      },
      setSpam() {
        this.$store.dispatch('SET_ACTIVE_CHAT_SPAM').then().catch(err => console.log(err)); /* TODO - заглушка*/
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
        return this.$store.getters.getChats[this.getId];
      }
    },
    components : {
      'chat-info-modal-component' : ChatInfoModal
    }
  }
</script>
