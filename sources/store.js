import TrialArticleToolbar from './trial/article/toolbar/script.store';

const store = {
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    create: TrialArticleToolbar
  }
};

export default store;
