import TrialArticleToolbar from './trial/article/toolbar/script.store';

const store = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    TrialArticleToolbar
  }
};

if (module.hot) {
  module.hot.accept([
    './trial/article/toolbar/script.store',
  ], () => {
    store.hotUpdate({
      stores: require('./trial/article/toolbar/script.store').default,
    })
  })
}

export default store;
