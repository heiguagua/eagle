import Http from "../../../common/scripts/http";
import JudgeTemplate from "./template";
import { message, storage, confirm } from "../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    JudgeTemplate
  },
  data() {
    return {
      operation: "", // 笔录生成结果页面判断当前操作是新建还是修改
    };
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    ...mapActions("Trial", [
      "getTrials"
    ]),
    cleanHTML(text) {
      return text.replace(/\sdata-v-\w*=""/g, "");
    },
    /** ----- 保存操作 ----- */
    saveCreate() {
      const vm = this;
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(storage.get("trial")); // 庭审笔录状态树
      const html = vm.cleanHTML(vm.$refs.template.$el.innerHTML); // 庭审笔录带样式HTML内容
      vm.options.loading = true;
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/trial",
          data: {
            case_no: code,
            json,
            html,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.getTrials({ vm });
            message(vm, "info", data.head.message);
            vm.options.loading = false; // 关闭loading动画
            vm.$router.push("/layout/trial/blank");
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
    saveUpdate() {
      const vm = this;
      vm.options.loading = true; // 加载loading动画
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(storage.get("trial")); // 庭审笔录状态树
      const html = vm.cleanHTML(vm.$refs.template.$el.innerHTML); // 庭审笔录带样式HTML内容
      const trialID = storage.get("updatedTrialInfo").record_id;
      Http.fetch({
          method: "PUT",
          url: Http.url.master + "/trial/" + trialID,
          data: {
            case_no: code,
            json,
            html,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.getTrials({ vm });
            message(vm, "info", data.head.message);
            vm.options.loading = false; // 关闭loading动画
            vm.$router.push("/layout/trial/blank");
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
    /** ----- 返回生成页面 ----- */
    backCreate() {
      this.$router.push({ path: "/layout/trial/produce", query: { operation: "create" } });
    },
    backUpdate() {
      this.$router.push({ path: "/layout/trial/produce", query: { operation: "update", random: Math.random() } });
    },
    exportWord() {
      const vm = this;
      const lawcase = storage.get("case");
      const template = vm.cleanHTML(vm.$refs.template.$el.innerHTML);
      const html = "<html><body>" + template + "</body></html>";
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/export/word",
          responseType: "blob",
          data: {
            html,
          }
        })
        .then(result => {
          const data = result.data;
          if (data) {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(data);
            link.download = lawcase.title + ".doc";
            link.click();
            window.URL.revokeObjectURL(link.href);
            message(vm, "info", "温馨提示：庭审笔录导出成功！");
          } else {
            message(vm, "warning", "温馨提示：庭审笔录导出失败！");
          }
        });
    },
    exportPDF() {
      const vm = this;
      const lawcase = storage.get("case");
      const template = vm.cleanHTML(vm.$refs.template.$el.innerHTML);
      const html = "<html><body>" + template + "</body></html>";
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/export/pdf",
          responseType: "blob",
          data: {
            html,
          }
        })
        .then(result => {
          const data = result.data;
          if (data) {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(data);
            link.download = lawcase.title + ".pdf";
            link.click();
            window.URL.revokeObjectURL(link.href);
            message(vm, "info", "温馨提示：庭审笔录导出成功！");
          } else {
            message(vm, "warning", "温馨提示：庭审笔录导出失败！");
          }
        });
    },
    print() {
      const vm = this;
      const template = vm.cleanHTML(vm.$refs.template.$el.innerHTML);
      const newWindow = window.open("", "_blank", "");
      newWindow.document.body.innerHTML = template;
      newWindow.print();
      newWindow.close();
    },
  },
  created() {
    const vm = this;
    vm.operation = vm.$route.query.operation; // 根据路由参数确定当前操作是更新还是新建
  },
};
