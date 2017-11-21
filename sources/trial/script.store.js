import Http from "../common/scripts/http";
import { message, storage } from "../common/scripts/helper";

export default {
  namespaced: true,
  state: {
    trial: {},
    trials: [],
    material: {},
    materials: [],
  },
  mutations: {
    setTrial(state, payload) {
      state.trial = payload;
    },
    setTrials(state, payload) {
      state.trial = payload;
    }
  },
  actions: {
    getTrial(context, payload) {
      (params) => {
        return Http.fetch({
          method: "GET",
          url: Http.url.master + "/legal_case/list",
          params: params
        })
      }
    },
    getTrials(context, payload) {
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trials",
          params: params
        })
        .then(function(result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(vm, "info", data.head.message);
            context.commit("setTrials", data);
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    }
  },
  getters: {}
};
