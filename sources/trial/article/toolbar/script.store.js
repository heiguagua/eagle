export default {
  state: {
    create: '',
  },
  mutations: {
    create(state, payload) {
      state.create = payload;
    }
  },
  actions: {
    create({ state, rootState, commit, dispatch, getters }, payload) {
      commit("create", "22")
    }
  },
  getters: {}
};
