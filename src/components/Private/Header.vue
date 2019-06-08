<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <a href="https://sitepower.io"><img src="../../assets/logo.svg" :width="!isMobile? '236px' : '111px'" alt=""></a>
      </div>
      <div class="menu" v-if="!isMobile">
        <ul>
          <li :class="[ activeComponent == 'Chats' ?  'active' : '' ]"><router-link to="chats">Диалоги</router-link></li>
          <li :class="[ activeComponent == 'Administration' ?  'active' : '' ]" v-if="admin === 'Y'"><router-link to="admin">Настройки</router-link></li>
          <li :class="[ activeComponent == 'Payments' ?  'active' : '' ]" v-if="admin === 'Y'"><router-link to="payments">Оплата <span class="badge" :class="[ amount <= 5 ?  'badge-danger' : 'badge-warning' ]">{{left}} {{amount}} {{day}}</span></router-link></li>
        </ul>
      </div>
        <div  class="navbar navbar-expand-lg navbar-dark">
          <button v-if="!isMobile" type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ getUserName }}
          </button>
          <div v-if="isMobile && activeComponent == 'Chats'">
            <a v-if="currentChatComponent === 'chat-body-component' || currentChatComponent === 'chat-info-component'" href="#" class="btn info btn-outline-light" @click.prevent="onBack">
              <i class="fas fa-arrow-left"></i>
            </a>
            <a v-if="currentChatComponent === 'chat-body-component'" href="#" class="btn info btn-outline-light" @click.prevent="onInfo">
              <i class="fas fa-info"></i>
            </a>

          </div>
          <button v-if="isMobile" type="button" class="navbar-toggler" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><router-link to="chats">Диалоги</router-link></button>
            <button class="dropdown-item" type="button" v-if="admin === 'Y'"><router-link to="admin">Настройки</router-link></button>
            <button class="dropdown-item" type="button" v-if="admin === 'Y'"><router-link to="payments">Оплата</router-link></button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="logout">Выход</button>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
  import * as $ from 'jquery'
  export default {
    name: "private-header-component",

    methods : {
      logout () {
        this.$store.dispatch('AUTH_LOGOUT')
          .then(() => {
            this.$socket.emit("exit");
            this.$router.push({ name: 'Login' })
          })
          .catch(err => {
            console.log(err.message);
          });
      },
      onInfo() {
        this.$store.commit("COMPONENT", 'chat-info-component');
      },
      onBack() {
        if (this.currentChatComponent === 'chat-info-component') {
          this.$store.commit("COMPONENT", 'chat-body-component');
        } else {

          this.$store.commit("COMPONENT", 'chat-list-component');
          setTimeout(() => {
            $('.main').scrollTop(0);
            $('html,body').animate({
              scrollTop: 0
            }, 0, () => {
              $('html,body').clearQueue();
            });
          }, 5)

        }

      },
    },
    computed: {
      getUserName () {
        return this.$store.getters.USER_NAME;
      },
      activeComponent() {
        return this.$route.name;
      },
      admin() {
        return this.$store.getters.ADMIN;
      },
      amount() {
        return this.$store.getters.AMOUNT;
      },
      day() {
        const d = this.amount;
        const rem = d%10;
        return rem === 1 ? 'день' : rem >= 2 && rem <= 4 ? 'дня' : 'дней';
      },
      left() {
        const d = this.amount;
        const rem = d%10;
        return  rem === 1 ? 'остался' : 'осталось';
      },
      isMobile: function() {
        return this.$isMobile();
      },
      currentChatComponent() {
        return this.$store.getters.COMPONENT;
      }
    },

  }
</script>
