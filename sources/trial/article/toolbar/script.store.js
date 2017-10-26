export default {
  state: {
    create: '',
  },
  mutations: {
    create(state, payload) {
      state = !state;
    }
  },
  actions: {
    create({ state, commit, rootState }) {
      commit("create")
    }
  },
  getters: {}
}
