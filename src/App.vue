<template>
  <div id="app">
    <div v-if="isUserLoggedIn" >
      <private-component></private-component>
    </div>
    <div v-else="isUserLoggedIn" >
      <public-component></public-component>
    </div>

  </div>
</template>

<script>
import Private from './Private';
import Public from './Public';



/*
import pricing from 'components/pricing/pricing';
import download from 'components/download/download';
import contact from 'components/contact/contact';
import pageFooter from 'components/pageFooter/page-footer';
*/

export default {
  name: 'App',
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  components: {
    'public-component' : Public,
    'private-component' : Private
  }
}
</script>

