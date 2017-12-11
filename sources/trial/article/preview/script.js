import Http from "../../../common/scripts/http";
import JudgeTemplate from "./template";
import { message, storage } from "../../../common/scripts/helper";
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
    save() {
      const vm = this;
      const code = storage.get("case").case_no; // 案号
      const json = JSON.stringify(storage.get("trial")); // 庭审笔录状态树
      const html = vm.$el.innerHTML.replace(/\sdata-v-\w*=""/g, "");
      vm.options.loading = false;
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
            vm.options.loading = true;
            vm.$router.push("/layout/trial/blank");
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
    back() {
      this.$router.push({ path: "/layout/trial/produce", query: { operation: "update" } });
    },
    toWord() {
      const vm = this;
      const html = vm.$el.innerHTML.replace(/\sdata-v-\w*=""/g, "");
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
          console.log("WORD", data);
          if (data) {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(data);
            link.download = "庭审笔录.docx";
            link.click();
            window.URL.revokeObjectURL(link.href);
            message(vm, "info", "温馨提示：庭审笔录导出成功！");
          } else {
            message(vm, "warning", "温馨提示：庭审笔录导出失败！");
          }
        });
    }
  }
};
