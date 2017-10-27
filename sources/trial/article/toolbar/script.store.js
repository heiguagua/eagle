export default {
  namespaced: true,
  state: {
    createState: 0,
  },
  mutations: {
    createMutation(state, payload) {
      state.createState += payload;
    }
  },
  actions: {
    createAction({ state, rootState, commit, dispatch, getters }, payload) {
      commit("createMutation", 1)
    }
  },
  getters: {}
};
