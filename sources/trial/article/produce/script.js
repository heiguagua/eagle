import Http from "../../../common/scripts/http";
import { message, confirm, storage } from "../../../common/scripts/helper";
import { elementquerysOrder } from "./5-investigate/4-inquiry/script";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
// Compoents
import TrialHeader from "./0-header";
import TrialInfomation from "./1-infomation";
import TrialDiscipline from "./2-discipline";
import TrialVerification from "./3-verification";
import TrialPreface from "./4-preface";
import TrialInvestigate from "./5-investigate";
import TrialArgument from "./6-argument";
import TrialStatement from "./7-statement";
import TrialConciliation from "./8-conciliation";
import TrialAnnounce from "./9-announce";
import TrialOther from "./10-other";
// Store
import trial from "./script.vue.data.trial.js";
import options from "./script.vue.data.options.js";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  components: {
    TrialHeader,
    TrialInfomation,
    TrialDiscipline,
    TrialVerification,
    TrialPreface,
    TrialInvestigate,
    TrialArgument,
    TrialStatement,
    TrialConciliation,
    TrialAnnounce,
    TrialOther
  },
  methods: {
    ...mapMutations("Trial", [
      "setTrial",
      "setOptions"
    ]),
    back() {
      const vm = this;
      confirm(vm, "warning", "是否需要返回庭审笔录-新建页面？")
        .then(() => {
          vm.$router.push("/layout/trial/blank");
        });
    },
    logTrial() {
      console.info("Trial", this.$store.state.Trial.trial);
    },
    generate() {
      const vm = this;
      this.trial.investigate.inquiry.proof_affirm = elementquerysOrder(this.trial.investigate.inquiry.elementquerys); //审议归纳排序
      const editorTrial = this.trial;
      storage.set("trial", editorTrial);
      vm.$router.push("/layout/trial/preview");
    },
    getTemplate() {
      const vm = this;
      const query = vm.$route.query;
      const param = vm.$route.params;
      console.log(param)
      Http.fetch({
          method: "GET",
          url: Http.url.master + "/trialRecordTemplate",
          params: {
            case_brief: query.case_brief || "民间借贷纠纷",
            category: query.category || "民事一审",
            hearing_procedure: query.hearing_procedure || "normal",
            write_type: param.write_type || "section",
          }
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            // vm.trial = data.body;
            return data
          } else {
            message(vm, "warning", data.head.message);
          }
        });
    },
  },
  mounted() {
    this.options.loading = false;
  },
  created() {
    const vm = this;
    const operation = vm.$route.query.operation;
    // 区分新建、修改的状态，从而挂载不同的store
    if (operation === "create") {
      this.setOptions(options);
      this.setTrial(trial());
    } else if (operation === "update") {
      this.setOptions(options);
      const trial = JSON.parse(storage.get("trial"));
      this.setTrial(trial);
    }
  },
  directives: {
    hoverToggle: {
      // 指令的定义
      bind: function(el, binding, vnode, oldVnode) {
        let target = el.querySelectorAll(".hover-toggle");
        // target.addEventListener("mouseover", function(event) {
        //   alert();
        // })
      }
    }
  }
};
