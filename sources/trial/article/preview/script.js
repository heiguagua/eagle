import Http from "../../../common/scripts/http";
import JudgeTemplate from "./template";
import { message, storage, confirm } from "../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    JudgeTemplate
  },
  data() {
    return {};
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
    save() {
      const vm = this;
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(storage.get("trial")); // 庭审笔录状态树
      const html = vm.cleanHTML(vm.$refs.template.$el.innerHTML);
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
            vm.$router.push("/layout/trial/blank");
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
    final() {
      const vm = this;
      console.log(storage.get("case"));
      confirm(vm, "warning", "是否确认当前庭审笔录为最终版本？")
        .then(() => {
          // Http.fetch({
          //     method: "POST",
          //     url: Http.url.master + "/trial/" + recordID + "/final",
          //   })
          //   .then(result => {
          //     const data = result.data;
          //     if (Http.protocol(data, 200)) {
          //     } else {
          //       message(vm, "warning", data.head.message);
          //     }
          //   });
        });
    },
    back() {
      this.$router.push({ path: "/layout/trial/produce", query: { operation: "update" } });
    },
    toWord() {
      const vm = this;
      const template = vm.cleanHTML(vm.$refs.template.$el.innerHTML);
      const html = "<html><body>" + template + "</body></html>";
      Http.fetch({
          method: "POST",
          url: Http.url.master + "/export/word",
          responseType: "blob",
          data: {
            fileName: "demo",
            html,
          }
        })
        .then(result => {
          const data = result.data;
          if (data) {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(data);
            link.download = "庭审笔录.doc";
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
  }
};
