import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, storage } from '../../../../common/scripts/helper';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options",
      "template"
    ]),
  },
  methods: {

  },
  created() {
    const params = storage.get("case");
    this.template.title.courtName = params.court_name
    if(params.case_brief == "工商行政管理（工商）") {
      this.trial.head.title = "行政案件审判笔录";
      this.trial.investigate.inquiry.select = false; //法庭询问模块隐藏
      this.trial.investigate.conclude.undisputed.show = false; //争点归纳-无争议
      this.trial.investigate.conclude.disputed.show = false; //争点归纳-争议
      this.trial.preface.evidence.navShow = false; //隐藏导航中的举证异议期限
      this.trial.investigate.opinion.navshow = true; //法庭调查下导航添加被诉行政行为
      this.trial.investigate.inquiry.navshow = true; ////工商案由下法庭询问导航与举证质证交换位置
    }else if(params.case_brief == "劳动争议" || params.case_brief == "婚姻家庭纠纷") {
      this.trial.investigate.inquiry.select = false; //法庭询问模块隐藏
    }
  }
};
