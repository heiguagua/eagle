import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, storage } from '../../../../common/scripts/helper';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {

  },
  created() {
    const params = storage.get("case");
    if(params.case_brief == "工商行政管理（工商）") {
      this.trial.head.title = "行政案件审判笔录";
      this.trial.investigate.inquiry.status = false; //法庭询问模块隐藏
      this.trial.investigate.conclude.undisputed.show = false; //争点归纳-无争议
      this.trial.investigate.conclude.disputed.show = false; //争点归纳-争议
    }else if(params.case_brief == "劳动争议" || params.case_brief == "婚姻家庭纠纷") {
      this.trial.investigate.inquiry.status = false; //法庭询问模块隐藏
    }
    console.log("00",this.trial.investigate.conclude.undisputed.show)
  }
};
