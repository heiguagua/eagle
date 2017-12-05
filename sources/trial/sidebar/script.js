import UtilSidebar from "./script.util";
import Http from "../../common/scripts/http";
import { mapMutations, mapActions, mapState } from "vuex";
import { message, storage } from "../../common/scripts/helper";

export default {
  data() {
    return {
      activedCollapse: ["trials", "ocr"],
    }
  },
  computed: {
    ...mapState("Trial", [
      "trials"
    ]),
  },
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
      Http.fetch({
          method: "DELETE",
          url: Http.url.master + "/trial/" + recordID + "/" + case_no,
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(vm, "info", data.head.status);
            vm.getTrials({ vm })
          } else {
            message(vm, "warning", data.head.message);
          }
        });
    },
    updateTrial(row) {
      const vm = this;
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
            const updateTrial = data.body[0].json
            storage.set('updateTrial', updateTrial);
            message(vm, "info", data.head.message);
          } else {
            message(vm, "warning", data.head.message);
          }
        })
        .then(result => {
          vm.$router.push({ path: "/layout/trial/produce", query: { operation: "update" } });
        })
    },
  },
  created() {
    const vm = this;
    this.getTrials({ vm });
  }
};
