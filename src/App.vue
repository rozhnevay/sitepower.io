<template>
  <div id="app">
    <div>
      <header-component></header-component>
      <home-component></home-component>
      <login-modal-component></login-modal-component>
      <registration-modal-component></registration-modal-component>
      <reset-modal-component></reset-modal-component>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import LoginModal from './components/Login';
import RegistrationModal from './components/Registration';
import ResetModal from './components/PasswordReset';
import Home from './components/Home';



/*
import pricing from 'components/pricing/pricing';
import download from 'components/download/download';
import contact from 'components/contact/contact';
import pageFooter from 'components/pageFooter/page-footer';
*/

export default {
  name: 'App',
  components: {
    'header-component': Header,
    'login-modal-component': LoginModal,
    'registration-modal-component': RegistrationModal,
    'reset-modal-component': ResetModal,
    'home-component': Home
  }
}
</script>

<style lang="scss" src="./global-style.scss">
</style>
