import Http from "../../../common/scripts/http";
import { message, confirm, storage } from "../../../common/scripts/helper";
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
import template from "./script.vue.data.template.js";

export default {
  data() {
    return {
      operation: "", // 笔录生成页面判断当前操作是新建还是修改
    };
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "trials",
      "options",
      "template"
    ]),
  },
  components: {
    TrialHeader,
    TrialInfomation,
    TrialVerification,
    TrialDiscipline,
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
      "setOptions",
      "setLoading",
      "setTemplate"
    ]),
    ...mapActions("Trial", [
      "getTemplate",
    ]),
    // 生成公用方法
    generate() {
      const vm = this;
      storage.set("trial", this.trial);
      storage.set("template", this.template);
    },
    // 新建生成
    generateCreate() {
      const vm = this;
      let isLen_3 = (storage.get("case").hearing_procedure == "normal") ? true : false;
      let flag = false;
      if (isLen_3) {
        flag = (!this.trial.infomation.officer[1].name) || (!this.trial.infomation.officer[2].name);
      }
      console.log(flag)
      if (!this.trial.infomation.officer[0].name || flag || !this.trial.infomation.clerk) {
        message(vm, 'warning', "请必填审判长/审判员/书记员");
        return
      }
      vm.generate();
      vm.$router.replace({ path: "/layout/trial-divorce/preview", query: { operation: "create" } });
    },
    // 修改生成
    generateUpdate() {
      const vm = this;
      let isLen_3 = (storage.get("case").hearing_procedure == "normal") ? true : false;
      let flag = false;
      if (isLen_3) {
        flag = !this.trial.infomation.officer[1].name || !this.trial.infomation.officer[2].name
      }
      if (!this.trial.infomation.officer[0].name || flag || !this.trial.infomation.clerk) {
        message(vm, 'warning', "请必填审判长/审判员/书记员");
        return
      }
      vm.generate();
      vm.$router.replace({ path: "/layout/trial-divorce/preview", query: { operation: "update" } });
    },
    getTemplatess() {
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
    // 公用的笔录修改操作
    updateTrialTransaction() {
      const vm = this;
      vm.operation = vm.$route.query.operation;
      // 区分新建、修改的状态，从而挂载不同的store
      if (vm.operation === "create") {
        this.setOptions(options);
        this.setTrial(trial());
      } else if (vm.operation === "update") {
        this.setOptions(options);
        this.setTrial(storage.get("trial"));
      }
      // 开庭次数随右侧列表数联动
      // this.trial.infomation.location.times = this.trials.length + 1;
    },
    // 返回新建页面
    back() {
      const vm = this;
      confirm(vm, "warning", "是否需要返回庭审笔录-新建页面？")
        .then(() => {
          this.setLoading(false);
          vm.$router.replace("/layout/trial-divorce/blank");
        });
    },
  },
  watch: {
    $route(to, from) {
      this.updateTrialTransaction();
      this.setLoading(false);
    }
  },
  created() {
    this.updateTrialTransaction();
    this.setTemplate(template());
  },
  mounted() {
    this.setLoading(false);
    const vm = this;
    // 区分新建、修改的状态，从而挂载不同的store
    if (vm.operation === "create") {
      // 开庭次数随右侧列表数联动
      this.trial.infomation.location.times = this.trials.length + 1;
    } else if (vm.operation === "update") {
      // 开庭次数随右侧列表数联动
      this.trial.infomation.location.times = this.trial.infomation.location.times;
    }
    // console.log(this.template)
    let query = this.$route.query;
    let param = this.$route.params;
    this.getTemplate(query,param);
  },
  directives: {
    hoverToggle: {
      // 指令的定义
      bind: function(el, binding, vnode, oldVnode) {
        // let target = el.querySelectorAll(".hover-toggle");
        // target.addEventListener("mouseover", function(event) {
        //   alert();
        // })
      }
    }
  }
};
