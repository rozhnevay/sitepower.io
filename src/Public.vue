<template>
    <div>
      <header-component></header-component>
      <home-component></home-component>
      <login-modal-component></login-modal-component>
      <registration-modal-component></registration-modal-component>
      <reset-modal-component></reset-modal-component>
    </div>
</template>

<script>
  import Header from './components/Public/Header';
  import LoginModal from './components/Public/ModalLogin';
  import RegistrationModal from './components/Public/ModalRegistration';
  import ResetModal from './components/Public/ModalPasswordReset';
  import Home from './components/Public/Home';



  export default {
    name: 'Public',
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
