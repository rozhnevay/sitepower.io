/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"
import App from '../App';
import Administration from '../components/Private/Administration';
import Chat from '../components/Private/Chat';


Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'App',
      component: App,
      props: false
    },
    {
      path: "/admin",
      name: 'Administration',
      component: Administration,
      props: false
    },
    {
      path: "/chat",
      name: 'Chat',
      component: Chat,
      props: false
    }
  ]
})
