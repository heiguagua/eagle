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
  methods: {
    ...mapActions("Trial", [
      "getTrials",
    ]),
  },
  mounted() {
    const vm = this;
    this.getTrials({ vm });
  }
}
