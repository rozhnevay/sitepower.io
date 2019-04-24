/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"

import Private from '../Private';
import Administration from '../components/Private/Administration';
import Chat from '../components/Private/Chat';

import Home from '../components/Public/Home';
import Login from '../components/Public/Login';
import Registration from '../components/Public/Registration';
import PasswordReset from '../components/Public/PasswordReset';
import NotFound from '../components/Public/NotFound';


Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'Home',
      component: Home,
    },
    {
      path: "/login",
      name: 'Login',
      component: Login,
    },
    {
      path: "/registration",
      name: 'Registration',
      component: Registration,
    },
    {
      path: "/reset",
      name: 'PasswordReset',
      component: PasswordReset,
    },
    {
      path: "/private",
      name: 'Private',
      component: Private,
      children: [
        {
          path: "admin",
          name: 'Administration',
          component: Administration,
        },
        {
          path: "chat",
          name: 'Chat',
          component: Chat,
        }
      ]
    },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' },

  ]
})
