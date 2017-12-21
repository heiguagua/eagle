import Shortid from "shortid";
import Http from "../common/scripts/http";
import { MessageBox, Message } from "element-ui";
import { message, storage, confirm } from "../common/scripts/helper";

export default {
  namespaced: true,
  state: {
    trial: {},
    trials: [],
    options: {},
  },
  mutations: {
    // 设置单个笔录
    setTrial(state, payload) {
      state.trial = payload;
    },
    // 设置笔录列表
    setTrials(state, payload) {
      state.trials = payload;
    },
    // 设置配置项
    setOptions(state, payload) {
      state.options = payload;
    },
    // 设置加载动画
    setLoading(state, payload) {
      state.options.loading = payload;
    },
    // 设置休庭位置
    setAdjourn(state, payload) {
      MessageBox.confirm("是否确定在此处进行休庭？", "休庭提示", { type: "warning" })
        .then(() => {
          state.trial.adjourn = payload;
          Message({
            type: "success",
            message: "休庭操作成功！"
          })
        })
        .catch(() => {
          Message({
            type: "error",
            message: "休庭操作失败！"
          })
        })
    }
  },
  actions: {
    generateID() {
      return shortid.generate();
    },
    // 获取指定笔录
    getTrial(context, payload) {
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trial/" + payload.recordID,
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
    // 获取笔录列表
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
            context.commit("setTrials", data.body);
            // message(payload.vm, "info", data.head.message);
          } else {
            message(payload.vm, "warning", data.head.message);
          }
        })
    }
  },
  getters: {}
};
