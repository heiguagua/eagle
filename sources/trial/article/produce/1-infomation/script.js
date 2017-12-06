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
    }
  },
  created() {
    const params =storage.get("case");
    if(params.hearing_procedure === "simple"){
      this.trial.infomation.officer[0].duty ="审判员";
    }
  },
  methods: {

  },
};
