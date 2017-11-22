import Http from "../common/scripts/http";
import { message, storage } from "../common/scripts/helper";

export default {
  namespaced: true,
  state: {
    trial: {},
    trials: [],
  },
  mutations: {
    setTrial(state, payload) {
      state.trial = payload;
    },
    setTrials(state, payload) {
      state.trials = payload;
    }
  },
  actions: {
    getTrial(context, payload) {
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trial",
          params: {

          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(payload.vm, "info", data.head.status);
            context.commit("setTrials", data);
          } else {
            message(payload.vm, "warning", data.head.message);
          }
        });
    },
    getTrials(context, payload) {
      let lawsuit = storage.get("case");
      // lawsuit
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trials",
          params: {
            case_no: lawsuit.case_no
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(payload.vm, "info", data.head.message);
            context.commit("setTrials", data.json);
          } else {
            message(payload.vm, "warning", data.head.message);
          }
        })
    }
  },
  getters: {}
};
