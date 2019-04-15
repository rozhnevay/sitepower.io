<template>
  <div v-if="getId.length > 0" class="right-side">
    <div  class="top">
      <span class="name">{{chat.name}}</span>
      <p class="desc">First appeal on</p>
      <span class="date">{{chat.created | moment("DD.MM.YYYY HH:mm")}}</span>
      <hr>
    </div>
    <div class="overflow-auto">
      <div class="information">
        <span class="title">Information</span>
        <p class="items">Region: Moscow</p>
        <p class="items">Email: maksim@example.com</p>
        <p class="items">Phone: +7(708)32-32-2</p>
        <hr>
      </div>
      <div class="actions">
        <span class="title">Actions</span>
        <div class="buttons">
          <button class="btn btn-red" @click="setSpam">Add to spam</button>
          <!--<button class="btn btn-blue">Send dialog via Email</button>-->
          <button class="btn btn-blue">Add contact information</button>
        </div>
      </div>
      <div class="categories">
        <p class="title">Setup categorie</p>
        <div class="colors">
          <div :class="[ chat.class=='white' ? 'active' : '' ]" @click="setClass('white')" class="color color-white"></div>
          <div :class="[ chat.class=='green' ? 'active' : '' ]" @click="setClass('green')" class="color color-green"></div>
          <div :class="[ chat.class=='blue' ? 'active' : '' ]" @click="setClass('blue')" class="color color-blue"></div>
          <div :class="[ chat.class=='red' ? 'active' : '' ]" @click="setClass('red')" class="color color-red"></div>
          <div :class="[ chat.class=='pink' ? 'active' : '' ]" @click="setClass('pink')" class="color color-pink"></div>
          <div :class="[ chat.class=='orange' ? 'active' : '' ]" @click="setClass('orange')" class="color color-orange"></div>
          <div :class="[ chat.class=='purple' ? 'active' : '' ]" @click="setClass('purple')" class="color color-purple"></div>
          <div :class="[ chat.class=='black' ? 'active' : '' ]" @click="setClass('black')" class="color color-black"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  import * as jquery from 'jquery'
  export default {
    name: 'ChatInfo',
    methods :{
      setClass(name){
        // console.log("werwe "+ name);
        // axios.post("/api/chat/" + this.getId, {class:name}).then((res) => {
        //   this.chat.class = name;
        // }).catch(err => console.log(err.message))

        this.$store.commit('setActiveChatCategory', name);
      },
      setSpam() {
        this.$store.commit('setActiveChatSpam');
      }
    },
    computed : {
      getId () {
        return this.$store.getters.getActiveChatId;
      },
      chat () {
        let chat = this.$store.getters.getChats.filter(item => item.sitepower_id == this.getId);
        if (chat && chat[0] && chat[0].name) {
          return chat[0];
        }
        return null;
      }
    }
  }
</script>
