import Vue from 'vue';
import Vuex from 'vuex';
import TrialArticleToolbar from './trial/article/toolbar/script.store';

Vue.use(Vuex);

const Store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    create: TrialArticleToolbar
  }
});

if (module.hot) {
  module.hot.accept(['./store', './trial/article/toolbar/script.store'], () => {
    console.info('Vue hot update!');
    store.hotUpdate({
      modules: {
        create: require('./trial/article/toolbar/script.store').default
      }
    })
  })
};

export default Store;
