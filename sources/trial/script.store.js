export default {
  namespaced: true,
  state: {
    trial: {},
    trialList: [],
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
