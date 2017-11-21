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
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trial",
          params: {

          }
        })
        .then(result => {

        });
    },
    saveTrial(context, payload) {
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/trial",
          data: {
            case_no: payload.case_no,
            json: payload.json,
            html: payload.html,
          }
        })
        .then(result => {

        })
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
            console.log("getTrials", data);
            this.trials.body;
            // message(vm, "info", data.head.message);
            context.commit("setTrials", data);
          } else {
            // message(vm, "warning", data.head.message);
          }
        })
    }
  },
  getters: {}
};
