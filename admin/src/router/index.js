import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import VueSession from 'vue-session';
import 'nprogress/nprogress.css';
Vue.use(VueSession);
Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});
// router gards

export default router;
