import UtilSidebar from "./script.util";
import Http from "../../common/scripts/http";
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
  methods: {
    getTrialList() {
      const vm = this;
      UtilSidebar.query({
          case_no: this.$route.query.case_no
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            // vm.trialArray = data.body;
          } else {
            message(vm, "warning", data.head.message);
          }
        })
    },
  },
  mounted() {
    this.getTrialList();
  }
}
