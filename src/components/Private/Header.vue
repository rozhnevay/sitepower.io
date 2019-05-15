<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <a href="https://sitepower.io"><img src="../../assets/logo.svg" width="236px" alt=""></a>
      </div>
      <div class="menu" v-if="!isMobile">
        <ul>
          <li :class="[ activeComponent == 'Chats' ?  'active' : '' ]"><router-link to="chats">Диалоги</router-link></li>
          <li :class="[ activeComponent == 'Administration' ?  'active' : '' ]" v-if="admin === 'Y'"><router-link to="admin">Настройки</router-link></li>
          <li :class="[ activeComponent == 'Pay' ?  'active' : '' ]" v-if="admin === 'Y'"><router-link to="payments">Оплата <span class="badge" :class="[ amount <= 5 ?  'badge-danger' : 'badge-warning' ]">{{left}} {{amount}} {{day}}</span></router-link></li>
        </ul>
      </div>
        <div class="btn-group">
          <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ getUserName }}
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
    },

  }
</script>
