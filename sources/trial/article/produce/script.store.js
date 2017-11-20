export default {
  namespaced: true,
  state: {
    trial: {},
  },
  mutations: {
    syncTrial(state, payload) {
      state.trial = payload;
    }
  },
  actions: {
    action(context, payload) {
      context.commit("syncTrial", payload)
    }
  },
  getters: {}
};
