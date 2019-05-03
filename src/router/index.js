/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"

import Private from '../Private';
import Administration from '../components/Private/Administration';
import Chats from '../components/Private/Chats';

import ChatList from '../components/Private/ChatList';
import ChatBody from '../components/Private/ChatBody';

import Login from '../components/Public/Login';
import Registration from '../components/Public/Registration';
import PasswordReset from '../components/Public/PasswordReset';
import PasswordResetSuccess from '../components/Public/PasswordResetSuccess';
import NotFound from '../components/Public/NotFound';

import store from '../store' // your vuex store

const ifAuthenticated = (to, from, next) => {
  if (store.getters.USER_LOGGED_IN) {
    next()
    return
  }
  next('/')
}

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      component: Login,
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
      path: "/resetsuccess",
      name: 'PasswordResetSuccess',
      component: PasswordResetSuccess,
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
          path: "chats",
          name: 'Chats',
          component: Chats,
          children: [
            {
              path: "list",
              name: 'ChatList',
              component: ChatList,
            },
            {
              path: "body",
              name: 'ChatBody',
              component: ChatBody,
            },
          ]
        }
      ],
      beforeEnter: ifAuthenticated
    },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' },

  ]
})
