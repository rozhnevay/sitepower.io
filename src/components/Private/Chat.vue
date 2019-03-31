<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
      <div class="col-md-4 col-xl-3 chat">
        <div class="card mb-sm-3 mb-md-0 contacts_card">
          <div class="card-body contacts_body">
            <ul class="contacts">
              <li v-for="chat in chats">
                <div class="d-flex bd-highlight" @click="openChat(chat)" v-bind:class="activeChat.status">
                  <div class="user_info">
                    <span>{{chat.id}}</span>
                    <p>{{chat.created}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <chat-body-component :id="activeChat.id"></chat-body-component>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import ChatBody from '../Private/ChatBody';
  export default {
    name: 'Chat',
    data () {
      return {
        chats : [],
        activeChat: {status : "inactive", id: ""}
      }
    },
    created() {
      axios.get("/api/chats").then((res) => {
        console.log(res.data);
        this.chats = res.data;
      }).catch((err) => {
      })

    },
    methods: {
      openChat(chat) {
        this.activeChat.status= "active"
        this.activeChat.id = chat.sitepower_id;
      }
    },
    components: {
      'chat-body-component': ChatBody,
    }
  }
</script>

<style scoped>

  .chat{
    margin-top: auto;
    margin-bottom: auto;
    height: 100%;

    margin: 0;
    /*background: #7F7FD5;
    background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);*/
  }
  .card{
    height: 500px;
    border-radius: 15px !important;
    background-color: rgba(0,0,0,0.4) !important;
  }
  .user_info{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 15px;
  }
  .user_info span{
    font-size: 20px;
    color: white;
  }
  .user_info p{
    font-size: 10px;
    color: rgba(255,255,255,0.6);
  }
  .active{
    background-color: rgba(0,0,0,0.3);
  }
  .contacts{
    list-style: none;
    padding: 0;
  }
  .contacts li{
    width: 100% !important;
    padding: 5px 10px;
    margin-bottom: 15px !important;
  }
  .card-body:hover {
    cursor: pointer;
  }

</style>
