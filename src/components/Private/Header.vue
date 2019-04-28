<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <a href=""><img src="../../assets/logo.svg" width="236px" alt=""></a>
      </div>
      <div class="menu">
        <ul>
          <li :class="[ activeComponent == 'Chats' ?  'active' : '' ]"><router-link to="chats">Диалоги</router-link></li>
          <li :class="[ activeComponent == 'Administration' ?  'active' : '' ]"><router-link to="admin">Настройки</router-link></li>
          <!--<li :class="[ activeComponent == 'Pay' ?  'active' : '' ]"><router-link to="/pay">Payments <span class="badge badge-warning">{{account.balance}}</span></router-link></li>-->
        </ul>
      </div>
        <div class="btn-group">
          <button type="button" class="btn btn-outline-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ getUserName }}
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><router-link to="chats">Диалоги</router-link></button>
            <button class="dropdown-item" type="button"><router-link to="admin">Настройки</router-link></button>
            <!--<button class="dropdown-item" type="button">Payments <span class="badge badge-warning">55$</span></button>-->
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
          .then(() => this.$router.push({ name: 'Home' }))
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
      }
    },

  }
</script>
