export default {
  namespaced: true,
  state: {
    currentView: 'ArticleBlank',
  },
  mutations: {
    create(state, payload) {
      state.currentView = 'ArticleEditor';
    },
    back(state, payload) {
      state.currentView = 'ArticleBlank';
    }
  },
  // actions: {
  //   createAction({ state, rootState, commit, dispatch, getters }, payload) {
  //     commit("createMutation", 1)
  //   }
  // },
  getters: {}
};
