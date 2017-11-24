import UtilSidebar from "./script.util";
import Http from "../../common/scripts/http";
import { mapMutations, mapActions, mapState } from "vuex";
import { message } from "../../common/scripts/helper";


export default {
  data() {
    return {
      activedCollapse: ["trials", "ocr"],
      trialArray: [{
        date: "第1次庭审",
        name: "王小虎",
        province: "上海",
        city: "普陀区",
        address: "上海市普陀区金沙江路 1518 弄",
        zip: 200333
      }, {
        date: "第2次庭审",
        name: "王小虎",
        province: "上海",
        city: "普陀区",
        address: "上海市普陀区金沙江路 1518 弄",
        zip: 200333
      }, {
        date: "第3次庭审",
        name: "王小虎",
        province: "上海",
        city: "普陀区",
        address: "上海市普陀区金沙江路 1518 弄",
        zip: 200333
      }, {
        date: "第4次庭审",
        name: "王小虎",
        province: "上海",
        city: "普陀区",
        address: "上海市普陀区金沙江路 1518 弄",
        zip: 200333
      }]
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
      vm.$router.push("/layout/trial/produce");
    },
  },
  created() {
    const vm = this;
    this.getTrials({ vm });
  }
};
