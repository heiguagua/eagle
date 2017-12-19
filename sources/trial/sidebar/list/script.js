import Http from "../../../common/scripts/http";
import Encrypt from "../../../common/scripts/encrypt.js";
import { mapMutations, mapActions, mapState } from "vuex";
import { message, storage, confirm } from "../../../common/scripts/helper";
import UtilSidebar from "../script.util";

export default {
  data() {
    return {
      htmlTrial: "",
      peekDialogVisible: false,
    };
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "trials",
      "options",
    ]),
  },
  mounted() {},
  methods: {
    ...mapActions("Trial", [
      "getTrials",
    ]),
    ...mapMutations("Trial", [
      "setTrial",
      "setOptions"
    ]),
    removeTrial(row) {
      const vm = this;
      const recordID = row.record_id || "";
      const case_no = row.case_no || "";
      confirm(vm, "warning", "确认删除当前庭审笔录？")
        .then(() => {
          Http.fetch({
              method: "DELETE",
              url: Http.url.master + "/trial/" + recordID + "/" + case_no,
            })
            .then(result => {
              const data = result.data;
              if (Http.protocol(data, 200)) {
                message(vm, "info", data.head.message);
                vm.$router.replace({ path: "/layout/trial/blank" });
                vm.getTrials({ vm })
              } else {
                message(vm, "warning", data.head.message);
              }
            });
        });
    },
    updateTrial(row) {
      const vm = this;
      vm.options.loading = true;
      const recordID = row.record_id || "";
      const case_no = row.case_no || "";
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trial/" + recordID,
          params: {
            record_id: recordID,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200) && data.body.length !== 0) {
            storage.set("trial", data.body[0].json);
            storage.set("updatedTrialInfo", row);
            message(vm, "info", data.head.message);
          } else {
            message(vm, "warning", data.head.message);
          }
        })
        .then(result => {
          vm.$router.replace({ path: "/layout/trial/blank" });
        })
        .then(result => {
          vm.$router.replace({ path: "/layout/trial/produce", query: { operation: "update" } });
        })
    },
    peekTrial(row) {
      const vm = this;
      vm.peekDialogVisible = true;
      const recordID = row.record_id || "";
      const case_no = row.case_no || "";
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trial/" + recordID,
          params: {
            record_id: recordID,
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200) && data.body.length !== 0) {
            vm.htmlTrial = data.body[0].html;
            message(vm, "info", data.head.message);
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
    finalTrial(row) {
      const vm = this;
      const recordID = row.record_id || "";
      confirm(vm, "warning", "是否确认当前庭审笔录为最终版本？")
        .then(() => {
          Http.fetch({
              method: "POST",
              url: Http.url.master + "/trial/" + recordID + "/final",
            })
            .then(result => {
              const data = result.data;
              if (Http.protocol(data, 200)) {
                vm.getTrials({ vm });
                vm.$router.replace({ path: "/layout/trial/blank" });
                message(vm, "info", data.head.message);
              } else {
                message(vm, "warning", data.head.message);
              }
            });
        });
    },
  },
  created() {
    const vm = this;
    vm.getTrials({ vm });
  },
};
