import Vue from 'vue';
import Vuex from 'vuex';
import TrialArticleToolbar from './demo/script.store';

Vue.use(Vuex);

const Store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    TrialArticleToolbar
  }
});

if (module.hot) {
  module.hot.accept([
    './store',
    './demo/script.store',
  ], () => {
    console.info('Vue hot update!');
    Store.hotUpdate({
      modules: {
        TrialArticleToolbar: require('./demo/script.store').default
      }
    })
  })
};

export default Store;
