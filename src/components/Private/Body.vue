<template>
  <div id="private-body">
    <component :is="activeComponent"></component>
  </div>
</template>

<script>
  import Chat from '../Private/Chat';
  import Pref from '../Private/Pref';

  export default {
    name: 'Body',
    computed: {
      activeComponent() {
        return this.$store.getters.privateOpen
      }
    },
    components: {
      'Chat': Chat,
      'Pref': Pref
    },
  }
</script>

<style scoped>
  #private-body {
    height: 100%;
    height: -moz-available;          /* WebKit-based browsers will ignore this. */
    height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
    height: fill-available;
  }
</style>
