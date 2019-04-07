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
