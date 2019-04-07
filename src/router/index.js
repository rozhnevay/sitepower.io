/* eslint-disable */

import Vue from "vue"
import Router from "vue-router"
import App from '../App';
import 'babel-polyfill';

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: 'App',
      component: App,
      props: true
    }
  ]
})
