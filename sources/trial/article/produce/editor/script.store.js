export default {
  namespaced: true,
  state: {
    trial: {},
  },
  mutations: {
    generateMutation(state, trial) {
      state.trial = trial;
    }
  },
  actions: {
    generateAction(context, trial) {
      context.commit("generateMutation", trial);
      console.log("context", context);
    }
  },
  getters: {}
};
