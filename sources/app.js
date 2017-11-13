// library
import Vue from 'vue';
import VueRouterSync from 'vuex-router-sync';
import store from './store';
import router from './router';
import 'babel-polyfill';
// css
import './common/styles/base.scss';
import './common/styles/reset.scss';
import './common/styles/theme.scss';
import 'font-awesome/css/font-awesome.css';
// ui
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import * as VueMenu from '@hscmap/vue-menu';
import VueScrollTo from 'vue-scrollto';

Vue.use(ElementUI);
Vue.use(VueMenu);
Vue.use(VueScrollTo, {
  offset: -50,
  container: "#trial-article-editor .content",
});

/** Sync $route to store */
const unsync = VueRouterSync.sync(store, router);
unsync();

const app = new Vue({
  store,
  router
}).$mount('#app');
