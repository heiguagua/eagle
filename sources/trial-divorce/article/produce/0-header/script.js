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
    console.log("11ce",params)
    if(params.case_brief == "离婚纠纷") {
      this.trial.verification.participator.thirdparties.splice(0, 1);//删除第三人
      this.trial.verification.participator.accusers[0].responsibles.splice(0, 1);//删除原告法定代表人
      this.trial.verification.participator.accuseds[0].responsibles.splice(0, 1);//删除被告法定代表人
    }
  }
};
