/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"
import Homepage from '../components/Home';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import 'babel-polyfill';

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: 'home-component',
      component: Homepage
    }
  ]
})
