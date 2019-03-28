/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"
import App from '../App';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import 'babel-polyfill';

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: 'App',
      component: App
    }
  ]
})
