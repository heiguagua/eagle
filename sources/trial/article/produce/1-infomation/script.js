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
    isChiefOfficer() {
      return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
    },
    isChiefOfficerTwo() {
      const params =storage.get("case");
      return (params.hearing_procedure === "simple") ? false : true;
    },
  },
  created() {
    const params =storage.get("case");
    this.trial.preface.organize.program = params.hearing_procedure;
    this.trial.infomation.code =params.case_no;
    this.trial.infomation.reason =params.case_brief;
    this.trial.infomation.location.name =params.court_name;
    if(params.hearing_procedure === "simple"){
      this.trial.infomation.officer[0].duty ="审判员";
    }
  },
  methods: {
    isPublic() {
       if(this.trial.infomation.isPublic === "不公开") {
          this.trial.infomation.audience = 0;
       } 
    }
  },
};
