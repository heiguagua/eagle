import Vue from 'vue';
import Vuex from 'vuex';
import trialArticleProduceStore from './trial/article/produce/script.store';
import trialArticleProduceEditorStore from './trial/article/produce/editor/script.store';


Vue.use(Vuex);

const Store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    trialArticleProduceStore,
    trialArticleProduceEditorStore,
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
        trialArticleProduceStore: require('./trial/article/produce/script.store').default,
        trialArticleProduceEditorStore: require('./trial/article/produce/editor/script.store').default,
      }
    })
  })
};

export default Store;
